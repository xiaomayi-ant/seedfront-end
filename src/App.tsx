/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
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
  ExternalLink,
  CheckCircle2,
  Clock,
  Palette,
  Video,
  Settings2,
  Share2,
  ChevronRight,
  Send,
  User,
  X,
  Lightbulb,
  Clapperboard,
  Users,
  MapPin,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type MessageType = 'text' | 'tool-call' | 'action-card' | 'config-form' | 'user' | 'storyboard-card';

interface ToolStep {
  label: string;
  status: 'completed' | 'loading' | 'pending';
  detail?: string;
}

interface ConfigOption {
  label: string;
  value: string;
  selected?: boolean;
}

interface Message {
  id: string;
  type: MessageType;
  content?: string;
  sender: 'ai' | 'user';
  timestamp: string;
  toolSteps?: ToolStep[];
  configData?: {
    title: string;
    sections: {
      label: string;
      options: ConfigOption[];
    }[];
  };
  cardData?: {
    title: string;
    description: string;
    duration?: string;
    style?: string;
    type?: string;
    actions: { label: string; primary?: boolean }[];
    icon?: React.ReactNode;
    stats?: { label: string; value: string; icon: React.ReactNode }[];
  };
}

export default function App() {
  const [inputText, setInputText] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatMode) {
      scrollToBottom();
    }
  }, [messages, isChatMode]);

  const handleStartCreation = () => {
    if (!inputText.trim()) return;
    
    setIsChatMode(true);
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([userMsg]);
    setInputText('');

    // Simulate AI Response sequence
    setTimeout(() => {
      const toolCallMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'tool-call',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolSteps: [
          { label: '更新相关信息', detail: '设置用户意图和视频参数', status: 'completed' },
          { label: '更新相关信息', detail: '设置视频配置参数', status: 'completed' },
          { label: '进行剧本生成...', status: 'completed' },
        ]
      };
      setMessages(prev => [...prev, toolCallMsg]);
    }, 1000);

    setTimeout(() => {
      const textMsg: Message = {
        id: (Date.now() + 2).toString(),
        type: 'text',
        content: `剧本创作完成！我为你制作了一个精彩的张三丰大战张无忌的武侠剧本，总时长约24秒，完全符合500字以内的要求。\n\n**剧本概览**\n**故事核心**：元朝末年，武当与明教因正邪之辩，在武当山巅展开巅峰对决。张三丰以太极奥义化解张无忌的九阳神功，最终阐释“阴阳相生相克，何来正邪之分”的哲理。\n\n**分镜设计**：\n- **对峙开场** - 武当山巅金殿前，两位绝世高手对峙\n- **张无忌出招** - 腾空跃起，九阳神功红色能量波\n- **张三丰化解** - 太极剑画圆，白色气流漩涡\n- **剑掌交锋** - 太极剑与能量碰撞，金色火花四溅`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, textMsg]);
    }, 2500);

    setTimeout(() => {
      const actionCardMsg: Message = {
        id: (Date.now() + 3).toString(),
        type: 'action-card',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardData: {
          title: '剧本',
          description: '视频策划',
          duration: '24秒',
          style: '日漫 电影质感',
          icon: <FileText size={18} />,
          actions: [
            { label: '查看剧本' },
            { label: '生成分镜', primary: true }
          ]
        }
      };
      setMessages(prev => [...prev, actionCardMsg]);
    }, 3500);

    setTimeout(() => {
      const configMsg: Message = {
        id: (Date.now() + 4).toString(),
        type: 'config-form',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        configData: {
          title: '张三丰大战张无忌剧本创作确认',
          sections: [
            {
              label: '1. 视频时长要求',
              options: [
                { label: '15秒内', value: '15' },
                { label: '30秒内', value: '30' },
                { label: '45秒内', value: '45' },
                { label: '1分钟以上', value: '60' },
                { label: '系统推荐时长', value: 'auto', selected: true },
              ]
            },
            {
              label: '2. 视频比例',
              options: [
                { label: '16:9横屏', value: '16:9', selected: true },
                { label: '9:16竖屏', value: '9:16' },
                { label: '4:3', value: '4:3' },
                { label: '3:4', value: '3:4' },
              ]
            },
            {
              label: '3. 视频风格',
              options: [
                { label: '写实风', value: 'realistic' },
                { label: '动漫风', value: 'anime', selected: true },
                { label: '3D动画', value: '3d' },
                { label: '像素风', value: 'pixel' },
              ]
            }
          ]
        }
      };
      setMessages(prev => [...prev, configMsg]);
    }, 4500);

    setTimeout(() => {
      const storyboardMsg: Message = {
        id: (Date.now() + 5).toString(),
        type: 'storyboard-card',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardData: {
          title: '视频分镜',
          description: '角色：张三丰（武当祖师）、张无忌（明教教主）；场景：武当山巅金殿前；物品：太极剑、明教令牌；情节：张三丰与张无忌因门派理念冲突在武当山巅对峙，张无忌以九阳神功与乾坤大挪移发起攻击，张三丰以太极剑化解攻势...',
          duration: '29秒',
          style: '日漫 电影质感',
          icon: <Clapperboard size={18} />,
          stats: [
            { label: '角色', value: '3 角色', icon: <Users size={14} /> },
            { label: '场景', value: '1 场景', icon: <MapPin size={14} /> },
            { label: '时长', value: '8 分镜', icon: <Clock size={14} /> },
            { label: '道具', value: '2 道具', icon: <Package size={14} /> },
          ],
          actions: [
            { label: '生成视频' },
            { label: '手动编辑分镜', primary: true }
          ]
        }
      };
      setMessages(prev => [...prev, storyboardMsg]);
    }, 6000);
  };

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
          <button 
            onClick={() => { setIsChatMode(false); setMessages([]); }}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-xl transition-all shadow-sm border border-gray-200 dark:border-gray-700"
          >
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
              { icon: MessageSquare, text: '张三丰大战张无忌剧本' },
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
        <div className="h-16 flex items-center justify-end px-6 gap-4 z-10 border-b border-gray-50 dark:border-gray-900">
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

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {!isChatMode ? (
              <motion.div 
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 pb-20"
              >
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

                {/* Input Area (Hero) */}
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
                      <button 
                        onClick={handleStartCreation}
                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-12 px-6 rounded-full flex items-center gap-2 font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
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
              </motion.div>
            ) : (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-4xl mx-auto px-6 py-10 space-y-8"
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.type === 'user' && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 max-w-[80%] text-sm">
                        {msg.content}
                      </div>
                    )}

                    {msg.type === 'tool-call' && (
                      <div className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Settings2 size={18} className="text-green-500" />
                            <span>工具调用</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{msg.toolSteps?.length} 项已完成</span>
                            <ChevronDown size={14} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          {msg.toolSteps?.map((step, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                                <span className="font-medium">{step.label}</span>
                                {step.detail && <span className="text-gray-400">{step.detail}</span>}
                              </div>
                              <CheckCircle2 size={16} className="text-green-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.type === 'config-form' && msg.configData && (
                      <div className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2 font-medium">
                            <FileText size={18} />
                            <span>{msg.configData.title}</span>
                          </div>
                          <ChevronDown size={18} className="text-gray-400" />
                        </div>
                        <div className="space-y-6">
                          {msg.configData.sections.map((section, i) => (
                            <div key={i} className="space-y-3">
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{section.label}</h4>
                              <div className="flex flex-wrap gap-2">
                                {section.options.map((opt, j) => (
                                  <button 
                                    key={j}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                                      opt.selected 
                                        ? 'bg-purple-100 dark:bg-purple-900/30 text-primary border border-primary/30' 
                                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                          <button className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed">
                            已提交
                          </button>
                        </div>
                      </div>
                    )}

                    {(msg.type === 'action-card' || msg.type === 'storyboard-card') && msg.cardData && (
                      <div className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden mt-4">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              {msg.cardData.icon}
                              <span className="font-medium">{msg.cardData.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Clock size={14} />
                              <span>{msg.cardData.duration}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded text-xs font-medium">
                              故事
                            </span>
                            {msg.type === 'action-card' && <span className="text-sm text-gray-500">{msg.cardData.description}</span>}
                            <div className="flex-1" />
                            <div className="flex items-center gap-1.5 bg-purple-100 dark:bg-purple-900/30 text-primary px-2 py-1 rounded-full text-xs font-medium">
                              <Palette size={14} />
                              <span>{msg.cardData.style}</span>
                            </div>
                          </div>

                          {msg.type === 'storyboard-card' && (
                            <div className="mb-6 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                                {msg.cardData.description}
                              </p>
                              <div className="flex flex-wrap gap-4">
                                {msg.cardData.stats?.map((stat, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                                    {stat.icon}
                                    <span>{stat.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 rounded-xl p-4 flex items-start gap-3 relative">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                              <Lightbulb size={20} className="text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-primary mb-1">
                                {msg.type === 'storyboard-card' ? '完成您的视频创作' : '开始创作您的视频'}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {msg.type === 'storyboard-card' 
                                  ? '您可以点击“生成视频”直接生成，或点击“手动编辑分镜”编辑后生成视频' 
                                  : '点击“生成分镜”开始下一步，您也可以继续对话完善您的视频分镜'}
                              </p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-100/50 dark:bg-gray-800/50 flex items-center justify-between">
                          <span className="text-xs text-gray-400">{msg.timestamp}</span>
                          <div className="flex gap-2">
                            {msg.cardData.actions.map((action, i) => (
                              <button 
                                key={i}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                  action.primary 
                                    ? 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90' 
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Input Area (Chat Mode) */}
        <AnimatePresence>
          {isChatMode && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="p-6 border-t border-gray-50 dark:border-gray-900 bg-white dark:bg-gray-950"
            >
              <div className="max-w-4xl mx-auto">
                <div className="relative bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-transparent border-0 rounded-2xl p-4 pr-20 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-0 resize-none outline-none min-h-[60px]" 
                    placeholder="与综合助手对话，支持多种能力..."
                  />
                  <div className="px-4 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                        <Plus size={18} />
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium transition-colors">
                        <LayoutGrid size={14} />
                        <span>自动</span>
                      </button>
                      <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1" />
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium transition-colors">
                        <Sparkles size={14} />
                        <span>自动模式</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-400 text-xs font-medium transition-colors">
                        <Users size={14} />
                        <span>参与创作</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-gray-400">视频生成按 1 秒钟 1 积分扣除</span>
                      <button 
                        disabled={!inputText.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          inputText.trim() 
                            ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' 
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                        }`}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-4">
                  AI 可能会犯错，内容仅供参考，请核查重要信息。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (Right) */}
        <div className="absolute right-6 bottom-1/2 translate-y-1/2 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
            <Share2 size={20} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
