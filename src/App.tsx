/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Library, 
  MessageSquare, 
  Image as ImageIcon, 
  FileText, 
  PanelLeftClose, 
  HelpCircle, 
  Sparkles, 
  Crown, 
  Smartphone, 
  ChevronDown, 
  LayoutGrid, 
  Keyboard, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [inputText, setInputText] = useState('');

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 border-r border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col h-full">
        <div className="h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
              <Sparkles size={20} />
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <PanelLeftClose size={20} />
          </button>
        </div>

        <div className="px-4 py-2 space-y-2">
          <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-xl transition-all shadow-sm border border-gray-200 dark:border-gray-700">
            <Plus size={20} />
            新建
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-xl transition-all">
            <Library size={20} />
            资产库
          </button>
        </div>

        <div className="mt-6 flex-1 flex flex-col min-h-0">
          <div className="px-6 flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">历史记录</span>
            <button className="text-xs text-gray-400 hover:text-primary transition-colors">全部</button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 space-y-1">
            {[
              { icon: MessageSquare, text: '赛博朋克城市夜景...' },
              { icon: ImageIcon, text: '未来主义跑车设计概念' },
              { icon: FileText, text: '产品发布会文案草稿' },
            ].map((item, i) => (
              <div key={i} className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors text-sm text-gray-600 dark:text-gray-400">
                <item.icon size={18} className="text-gray-400" />
                <span className="truncate">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-900">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User Name</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-white dark:bg-gray-950">
        {/* Top Bar */}
        <div className="absolute top-0 right-0 p-6 flex items-center gap-4 z-10">
          <div className="flex items-center bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-full border border-purple-100 dark:border-purple-800">
            <Sparkles size={16} className="text-primary mr-1" />
            <span className="text-primary font-medium text-sm">积分 120</span>
            <span className="mx-2 text-gray-300 dark:text-gray-700 text-xs">|</span>
            <Crown size={16} className="text-primary mr-1" />
            <span className="text-primary font-medium text-sm cursor-pointer hover:underline">订阅</span>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 transition-colors">
            <MessageSquare size={20} />
          </button>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 pr-4 pl-1 py-1 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <Smartphone size={14} className="text-gray-600 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">user523...</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
              嗨 <span className="text-primary">user523615...</span>！你的创作空间已就绪。
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
              小云雀，你的全能AI创作助手
            </p>
          </motion.div>

          {/* Input Area */}
          <div className="w-full max-w-4xl relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative w-full bg-white dark:bg-gray-900 rounded-[2rem] border border-primary/20 dark:border-primary/40 shadow-xl flex flex-col min-h-[220px]">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full flex-1 bg-transparent border-0 rounded-[2rem] p-8 text-lg md:text-xl text-gray-800 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 focus:ring-0 resize-none outline-none" 
                placeholder="告诉我，你今天想创造一点什么？"
              />
              <div className="px-6 pb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500 transition-colors" title="Upload file">
                    <Plus size={20} />
                  </button>
                  <button className="h-10 px-4 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors text-sm font-medium">
                    <LayoutGrid size={18} />
                    模式
                    <ChevronDown size={16} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500 transition-colors" title="Templates">
                    <LayoutGrid size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500 transition-colors" title="Settings">
                    <Keyboard size={20} />
                  </button>
                </div>
                <button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-12 px-6 rounded-full flex items-center gap-2 font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Sparkles size={18} fill="currentColor" />
                  <span>开始创作</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Prompts */}
          <div className="mt-10 w-full max-w-4xl flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
            {[
              { text: '参考爆款视频', icon: 'tiktok' },
              { text: '漫剧：超绝人物特写', img: 'https://picsum.photos/seed/comic/32/20' },
              { text: '猫狗偷玩手机一秒装睡' },
              { text: '香港电影 · 996' },
              { text: '咖啡产品宣传图' },
              { text: '《知否知否》MV制作' },
            ].map((prompt, i) => (
              <a key={i} href="#" className="flex items-center gap-2 hover:text-primary transition-colors group">
                {prompt.icon === 'tiktok' && (
                  <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary/10">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
                  </span>
                )}
                {prompt.img && (
                  <div className="w-8 h-5 rounded overflow-hidden relative">
                    <img src={prompt.img} alt="" className="object-cover w-full h-full opacity-80 group-hover:opacity-100" referrerPolicy="no-referrer" />
                  </div>
                )}
                <span>{prompt.text}</span>
                <ExternalLink size={12} className="opacity-50" />
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
