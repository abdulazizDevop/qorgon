import { GoogleGenAI } from "@google/genai";

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}

type Listener = () => void;

class ChatStore {
  private sessions: ChatSession[] = [];
  private activeSessionId: string = '';
  private isLoading: boolean = false;
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem('korgon_ai_chats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          this.sessions = parsed.map((s: any) => ({
            ...s,
            updatedAt: new Date(s.updatedAt || new Date()),
            messages: (s.messages || []).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
          }));
          this.activeSessionId = this.sessions[0].id;
          return;
        }
      }
    } catch (e) {
      console.error("Failed to parse chat memory", e);
    }

    // Default empty state
    const newId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10);
    this.sessions = [{
      id: newId,
      title: 'Yangi chat',
      messages: [{
        id: '1',
        text: "Assalomu alaykum! Men Ko'rg'on Ai virtual agronomiman. Sizga qanday yordam bera olaman?",
        sender: 'ai',
        timestamp: new Date()
      }],
      updatedAt: new Date()
    }];
    this.activeSessionId = newId;
  }

  private saveToStorage() {
    localStorage.setItem('korgon_ai_chats', JSON.stringify(this.sessions));
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.saveToStorage();
    this.listeners.forEach(l => l());
  }

  public getSessions() {
    return this.sessions;
  }

  public getActiveSessionId() {
    return this.activeSessionId;
  }

  public getIsLoading() {
    return this.isLoading;
  }

  public setActiveSessionId(id: string) {
    this.activeSessionId = id;
    this.notify();
  }

  public createNewChat() {
    const newSession: ChatSession = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10),
      title: 'Yangi chat',
      messages: [{
        id: '1',
        text: "Assalomu alaykum! Men Ko'rg'on Ai virtual agronomiman. Sizga qanday yordam bera olaman?",
        sender: 'ai',
        timestamp: new Date()
      }],
      updatedAt: new Date()
    };
    this.sessions = [newSession, ...this.sessions];
    this.activeSessionId = newSession.id;
    this.notify();
  }

  public deleteSession(id: string) {
    this.sessions = this.sessions.filter(s => s.id !== id);
    if (this.sessions.length === 0) {
      this.createNewChat(); // Will notify automatically
    } else {
      if (this.activeSessionId === id) {
        this.activeSessionId = this.sessions[0].id;
      }
      this.notify();
    }
  }

  public updateSessionTitle(id: string, newTitle: string) {
    this.sessions = this.sessions.map(s => {
      if (s.id === id) {
        return { ...s, title: newTitle, updatedAt: new Date() };
      }
      return s;
    });
    this.notify();
  }

  public async sendMessage(text: string) {
    if (!text.trim() || !this.activeSessionId) return;

    const userMessage: Message = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    const sessionIndex = this.sessions.findIndex(s => s.id === this.activeSessionId);
    if (sessionIndex === -1) return;

    const sessionHasOnlyIntro = this.sessions[sessionIndex].messages.length <= 1;
    const currentSessionId = this.activeSessionId;

    // Update with user message
    this.sessions = this.sessions.map(s => {
      if (s.id === currentSessionId) {
        return { 
          ...s, 
          messages: [...s.messages, userMessage],
          title: sessionHasOnlyIntro ? text.split(' ').slice(0, 4).join(' ') + (text.split(' ').length > 4 ? '...' : '') : s.title,
          updatedAt: new Date() 
        };
      }
      return s;
    });
    
    this.isLoading = true;
    this.notify();

    try {
      const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
      if (!apiKey) throw new Error("API kaliti topilmadi");

      const ai = new GoogleGenAI({ apiKey });
      
      const session = this.sessions.find(s => s.id === currentSessionId)!;
      const historyParts = session.messages.slice(1, -1).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "Siz Ko'rg'on Ai platformasining tajribali agronomi va o'simlikshunos olimisiz. Fermerlarga qisqa, aniq va foydali maslahatlar bering. Javoblaringiz o'zbek tilida bo'lsin."
        },
        history: historyParts.length ? historyParts : [
          { role: "user", parts: [{ text: "Salom" }] },
          { role: "model", parts: [{ text: "Assalomu alaykum! Men Ko'rg'on Ai agronomi sifatida fermerlarga professional yordam berishga tayyorman." }] },
        ],
      });

      const result = await chat.sendMessage({ message: text });
      
      const aiMessage: Message = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10),
        text: result.text,
        sender: 'ai',
        timestamp: new Date()
      };

      this.sessions = this.sessions.map(s => {
        if (s.id === currentSessionId) {
          return { ...s, messages: [...s.messages, aiMessage], updatedAt: new Date() };
        }
        return s;
      });

    } catch (error: any) {
      console.error("Chat error:", error);
      
      let errorText = "Uzr, tizimda xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring.";
      const errorMsg = error instanceof Error ? error.message : String(error);

      if (errorMsg.includes("503") || errorMsg.includes("UNAVAILABLE")) {
         errorText = "Uzr, AI modelida hozirda vaqtincha yuqori yuklanish kuzatilmoqda. Iltimos, biroz kutib turing va qayta urinib ko'ring.";
      } else if (errorMsg.includes("429") || errorMsg.includes("quota")) {
         errorText = "Uzr, so'rovlar limitidan oshib ketdingiz. Iltimos birozdan so'ng qayta urinib ko'ring yoki API kalit sozlamalarini tekshiring.";
      } else if (errorMsg.includes("Failed to fetch") || errorMsg.includes("Network")) {
         errorText = "Tarmoqqa ulanish xatosi. Iltimos, internetingiz barqarorligini yoki VPN yoqilmaganligini tekshiring.";
      }

      const errorMessage: Message = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10),
        text: errorText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      this.sessions = this.sessions.map(s => {
        if (s.id === currentSessionId) {
          return { ...s, messages: [...s.messages, errorMessage], updatedAt: new Date() };
        }
        return s;
      });
    } finally {
      this.isLoading = false;
      this.notify();
    }
  }
}

export const chatStore = new ChatStore();

import { useState, useEffect } from 'react';

export function useChatStore() {
  const [state, setState] = useState({
    sessions: chatStore.getSessions(),
    activeSessionId: chatStore.getActiveSessionId(),
    isLoading: chatStore.getIsLoading()
  });

  useEffect(() => {
    return chatStore.subscribe(() => {
      setState({
        sessions: chatStore.getSessions(),
        activeSessionId: chatStore.getActiveSessionId(),
        isLoading: chatStore.getIsLoading()
      });
    });
  }, []);

  return state;
}
