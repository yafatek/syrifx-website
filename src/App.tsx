import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Bell, 
  Zap, 
  Shield, 
  ArrowLeft,
  Sparkles,
  Send,
  Check,
  ChevronDown,
  Coins,
  MessageCircle,
  CheckCircle2,
  ChevronLeft,
  MapPin,
  Globe,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// =============================================================================
// ANIMATED COUNTER
// =============================================================================
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('ar-SY')}{suffix}
    </span>
  )
}

// =============================================================================
// CITY BADGE
// =============================================================================
function CityBadge({ city, active = false }: { city: string; active?: boolean }) {
  return (
    <div className={cn(
      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
      active 
        ? "bg-accent text-black" 
        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
    )}>
      {city}
    </div>
  )
}

// =============================================================================
// CURRENCY CARD
// =============================================================================
function CurrencyCard({ 
  currency, 
  flag, 
  rate, 
  change, 
  delay = 0,
}: { 
  currency: string
  flag: string
  rate: string
  change: number
  delay?: number
}) {
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-5 h-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{flag}</span>
          <span className="text-zinc-400 text-sm font-medium">{currency}</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold text-white font-mono tracking-tight" dir="ltr">
            {rate}
          </div>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
            isPositive 
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span dir="ltr">{isPositive ? '+' : ''}{change}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// STEP CARD - How it works
// =============================================================================
function StepCard({ number, title, description, icon: Icon }: {
  number: number
  title: string
  description: string
  icon: React.ElementType
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <div className="text-accent text-sm font-bold mb-1">الخطوة {number}</div>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// FAQ ITEM
// =============================================================================
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-zinc-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between gap-4 text-right"
      >
        <span className="font-bold text-white">{question}</span>
        <ChevronLeft className={cn(
          "w-5 h-5 text-zinc-400 transition-transform",
          isOpen && "rotate-90"
        )} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// =============================================================================
// TELEGRAM CHAT - Enhanced with new features
// =============================================================================
function TelegramChat() {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', text: string, isTyping?: boolean}>>([])
  const [, setStep] = useState(0)
  const [selectedCity, setSelectedCity] = useState('دمشق')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    
    const chatSequence = [
      { type: 'user' as const, text: 'button_rate' },
      { type: 'bot' as const, text: 'loading' },
      { type: 'bot' as const, text: 'rates' },
      { type: 'user' as const, text: 'button_city' },
      { type: 'bot' as const, text: 'loading' },
      { type: 'bot' as const, text: 'city_changed' },
    ]
    
    const timer = setInterval(() => {
      setStep(prev => {
        if (prev >= chatSequence.length) {
          clearInterval(timer)
          return prev
        }
        const currentStep = chatSequence[prev]
        if (currentStep.text === 'loading') {
          setMessages(msgs => [...msgs, { type: 'bot', text: '', isTyping: true }])
        } else if (currentStep.text === 'rates') {
          setMessages(msgs => {
            const newMsgs = msgs.filter(m => !m.isTyping)
            return [...newMsgs, { type: 'bot', text: 'rates' }]
          })
        } else if (currentStep.text === 'city_changed') {
          setSelectedCity('حلب')
          setMessages(msgs => {
            const newMsgs = msgs.filter(m => !m.isTyping)
            return [...newMsgs, { type: 'bot', text: 'city_changed' }]
          })
        } else if (currentStep.text === 'button_rate') {
          setMessages(msgs => [...msgs, { type: 'user', text: '💵 الأسعار' }])
        } else if (currentStep.text === 'button_city') {
          setMessages(msgs => [...msgs, { type: 'user', text: '🏙 حلب' }])
        } else {
          setMessages(msgs => [...msgs, currentStep])
        }
        return prev + 1
      })
    }, 1500)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <div className="relative mx-auto w-[300px]">
        <div className="absolute -inset-8 bg-gradient-to-b from-accent/20 via-primary/10 to-transparent blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-zinc-800 rounded-[2.5rem] p-2 shadow-2xl border border-zinc-700"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
          <div className="bg-zinc-950 rounded-[2rem] overflow-hidden">
            <div className="bg-primary pt-8 pb-3 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center">
                  <span className="text-lg font-black text-black">س</span>
                </div>
                <div>
                  <div className="font-bold text-white">سيري إف إكس</div>
                  <div className="text-xs text-white/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    متصل
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[360px] p-3 space-y-2 overflow-hidden">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", msg.type === 'user' ? "justify-start" : "justify-end")}
                  >
                    {msg.isTyping ? (
                      <div className="bg-zinc-800 rounded-2xl rounded-br-sm px-4 py-3">
                        <div className="flex gap-1">
                          {[0,1,2].map(i => (
                            <span key={i} className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: `${i*150}ms` }} />
                          ))}
                        </div>
                      </div>
                    ) : msg.type === 'user' ? (
                      <div className="bg-primary text-white rounded-2xl rounded-bl-sm px-4 py-2 text-sm">{msg.text}</div>
                    ) : msg.text === 'rates' ? (
                      <div className="bg-zinc-800 rounded-2xl rounded-br-sm p-3 max-w-[90%]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-accent text-xs font-bold flex items-center gap-1">
                            <Coins className="w-3 h-3" />
                            أسعار {selectedCity}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                            <MapPin className="w-2.5 h-2.5" />
                            {selectedCity}
                          </div>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          {[
                            { flag: '🇺🇸', name: 'دولار', rate: '14,825', change: '+1.2%' },
                            { flag: '🇪🇺', name: 'يورو', rate: '15,650', change: '+0.8%' },
                            { flag: '🇹🇷', name: 'تركي', rate: '420', change: '-0.3%' },
                            { flag: '🇦🇪', name: 'درهم', rate: '4,035', change: '+0.5%' },
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center gap-2">
                              <span className="text-zinc-400">{item.flag} {item.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-white" dir="ltr">{item.rate}</span>
                                <span className={cn(
                                  "text-[9px] font-bold",
                                  item.change.startsWith('+') ? "text-emerald-400" : "text-red-400"
                                )} dir="ltr">{item.change}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          <button className="px-2 py-1 bg-zinc-700 rounded text-[9px] text-zinc-300">📊 كل العملات</button>
                          <button className="px-2 py-1 bg-zinc-700 rounded text-[9px] text-zinc-300">🏙 المدينة</button>
                        </div>
                        <div className="text-[9px] text-zinc-500 mt-2 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                          منذ دقيقتين
                        </div>
                      </div>
                    ) : msg.text === 'city_changed' ? (
                      <div className="bg-zinc-800 rounded-2xl rounded-br-sm p-3 max-w-[90%]">
                        <div className="text-accent text-xs font-bold mb-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          تم تغيير المدينة
                        </div>
                        <div className="space-y-1.5 text-xs">
                          {[
                            { flag: '🇺🇸', name: 'دولار', rate: '14,800', change: '+1.1%' },
                            { flag: '🇪🇺', name: 'يورو', rate: '15,620', change: '+0.7%' },
                            { flag: '🇹🇷', name: 'تركي', rate: '418', change: '-0.4%' },
                            { flag: '🇦🇪', name: 'درهم', rate: '4,028', change: '+0.4%' },
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center gap-2">
                              <span className="text-zinc-400">{item.flag} {item.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-white" dir="ltr">{item.rate}</span>
                                <span className={cn(
                                  "text-[9px] font-bold",
                                  item.change.startsWith('+') ? "text-emerald-400" : "text-red-400"
                                )} dir="ltr">{item.change}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-[9px] text-zinc-500 mt-2 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-accent" />
                          أسعار حلب
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="p-2 bg-zinc-900 border-t border-zinc-800">
              <div className="flex gap-1 mb-2">
                <button className="flex-1 px-2 py-1.5 bg-primary/20 border border-primary/30 rounded-lg text-[10px] text-primary font-bold">💵 الأسعار</button>
                <button className="flex-1 px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-[10px] text-zinc-400">💱 تحويل</button>
                <button className="flex-1 px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-[10px] text-zinc-400">🥇 الذهب</button>
              </div>
              <div className="flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-2">
                <input type="text" placeholder="اكتب رسالة..." className="flex-1 bg-transparent text-xs text-white placeholder:text-zinc-500 outline-none" readOnly />
                <Send className="w-4 h-4 text-accent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// =============================================================================
// FEATURE CARD
// =============================================================================
function FeatureCard({ icon: Icon, title, description, gradient, delay = 0 }: { 
  icon: React.ElementType; title: string; description: string; gradient: string; delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="relative h-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br", gradient)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// =============================================================================
// CITY SHOWCASE
// =============================================================================
function CityShowcase() {
  const cities = [
    { name: 'دمشق', nameEn: 'Damascus', emoji: '🏛️' },
    { name: 'حلب', nameEn: 'Aleppo', emoji: '🏰' },
    { name: 'إدلب', nameEn: 'Idlib', emoji: '🌳' },
    { name: 'الحسكة', nameEn: 'Al-Hasakah', emoji: '🌾' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-3"
    >
      {cities.map((city, i) => (
        <motion.div
          key={city.nameEn}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl flex items-center gap-2"
        >
          <span className="text-xl">{city.emoji}</span>
          <span className="font-bold text-white">{city.name}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

// =============================================================================
// CURRENCY GRID
// =============================================================================
function CurrencyGrid() {
  const currencies = [
    { code: 'USD', flag: '🇺🇸', name: 'دولار' },
    { code: 'EUR', flag: '🇪🇺', name: 'يورو' },
    { code: 'TRY', flag: '🇹🇷', name: 'تركي' },
    { code: 'AED', flag: '🇦🇪', name: 'درهم' },
    { code: 'SAR', flag: '🇸🇦', name: 'ريال' },
    { code: 'GBP', flag: '🇬🇧', name: 'استرليني' },
    { code: 'JOD', flag: '🇯🇴', name: 'دينار أردني' },
    { code: 'EGP', flag: '🇪🇬', name: 'جنيه مصري' },
    { code: 'KWD', flag: '🇰🇼', name: 'دينار كويتي' },
    { code: 'QAR', flag: '🇶🇦', name: 'ريال قطري' },
    { code: 'LBP', flag: '🇱🇧', name: 'ليرة لبنانية' },
    { code: 'IQD', flag: '🇮🇶', name: 'دينار عراقي' },
  ]

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {currencies.map((cur, i) => (
        <motion.div
          key={cur.code}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          className="px-3 py-2 bg-zinc-800/30 border border-zinc-700/30 rounded-lg text-center hover:bg-zinc-800/50 transition-colors"
        >
          <span className="text-lg">{cur.flag}</span>
          <div className="text-[10px] text-zinc-500 mt-1">{cur.name}</div>
        </motion.div>
      ))}
    </div>
  )
}

// =============================================================================
// MAIN APP
// =============================================================================
export default function App() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden font-tajawal">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* ================================================================= */}
      {/* HEADER */}
      {/* ================================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto flex items-center justify-between bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl px-5 py-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-lg font-black text-white">س</span>
            </div>
            <span className="font-bold text-lg">سيري إف إكس</span>
            <span className="hidden sm:inline-flex px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded-full">v1.1</span>
          </div>
          <motion.a
            href="https://t.me/SyriFXBot"
            target="_blank"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-accent hover:bg-accent/90 text-black font-bold px-5 py-2 rounded-xl text-sm flex items-center gap-2"
          >
            جربه الآن
            <ArrowLeft className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </header>

      {/* ================================================================= */}
      {/* HERO */}
      {/* ================================================================= */}
      <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            مجاني • ٤ مدن • ١٧+ عملة
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            أسعار الصرف
            <br />
            <span className="text-accent">لكل المدن السورية!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-xl mx-auto"
          >
            بوت تيليجرام بيعطيك سعر الصرف والذهب لـ
            <span className="text-white font-bold"> دمشق، حلب، إدلب، والحسكة</span>
            <br />
            مع أكثر من ١٧ عملة!
          </motion.p>

          {/* City badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <CityBadge city="🏛️ دمشق" active />
            <CityBadge city="🏰 حلب" />
            <CityBadge city="🌳 إدلب" />
            <CityBadge city="🌾 الحسكة" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.a
              href="https://t.me/SyriFXBot"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-black font-bold text-lg rounded-2xl"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.869 4.326-2.96-.924c-.643-.203-.657-.643.136-.953l11.566-4.458c.537-.194 1.006.131.833.939z"/>
              </svg>
              افتح البوت
              <ArrowLeft className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#how"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border-2 border-zinc-700 hover:border-zinc-600 text-white font-bold text-lg rounded-2xl"
            >
              كيف يشتغل؟
              <ChevronDown className="w-5 h-5" />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <CurrencyCard currency="الدولار" flag="🇺🇸" rate="14,825" change={1.2} delay={0.4} />
            <CurrencyCard currency="اليورو" flag="🇪🇺" rate="15,650" change={0.8} delay={0.5} />
            <CurrencyCard currency="التركي" flag="🇹🇷" rate="420" change={-0.3} delay={0.6} />
            <CurrencyCard currency="الذهب" flag="🥇" rate="1,440,000" change={0.5} delay={0.7} />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-5 h-8 rounded-full border-2 border-zinc-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </motion.div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* STATS */}
      {/* ================================================================= */}
      <section className="py-16 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 4, suffix: ' مدن', label: 'دمشق، حلب، إدلب، الحسكة' },
              { value: 17, suffix: '+ عملة', label: 'كل العملات المتداولة' },
              { value: 5, suffix: ' دقايق', label: 'بتحدث الأسعار' },
              { value: 100, suffix: '%', label: 'مجاني بالكامل' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-zinc-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CITIES & CURRENCIES */}
      {/* ================================================================= */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-black mb-4">
              <span className="text-accent">٤ مدن</span> و <span className="text-accent">١٧+ عملة</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg max-w-xl mx-auto">
              اختر مدينتك واحصل على الأسعار المحلية
            </motion.p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                المدن المدعومة
              </h3>
              <CityShowcase />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                العملات المتوفرة
              </h3>
              <CurrencyGrid />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================================= */}
      <section id="how" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-black mb-4">
              كيف بستخدمه؟ <span className="text-accent">سهل كتير!</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg">
              ٣ خطوات بس وبتصير جاهز
            </motion.p>
          </div>

          <div className="space-y-8">
            <StepCard 
              number={1} 
              icon={MessageCircle}
              title="افتح التيليجرام" 
              description="اضغط على الزر وبيفتح معك البوت مباشرة. ما في تسجيل ولا شي، بس افتح وابدأ."
            />
            <StepCard 
              number={2} 
              icon={MapPin}
              title="اختر مدينتك" 
              description="اختر مدينتك (دمشق، حلب، إدلب، أو الحسكة) والبوت بيحفظ اختيارك للمرات الجاية."
            />
            <StepCard 
              number={3} 
              icon={CheckCircle2}
              title="شوف الأسعار" 
              description="اضغط على زر الأسعار أو اختر عملة معينة. كل شي بأزرار سهلة!"
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* WHY US - Pain Points */}
      {/* ================================================================= */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-black mb-4">
              ليش <span className="text-accent">سيري إف إكس</span>؟
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg max-w-xl mx-auto">
              خلينا نكون صريحين... المواقع التانية مليانة إعلانات وبطيئة
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon={MapPin} title="أسعار كل مدينة" description="كل مدينة إلها أسعارها الخاصة. اختر دمشق، حلب، إدلب، أو الحسكة وشوف الأسعار المحلية." gradient="from-rose-500 to-pink-500" delay={0} />
            <FeatureCard icon={Globe} title="١٧+ عملة" description="مش بس دولار ويورو! عنا الدرهم، الريال، التركي، الدينار، وكل العملات يلي بتحتاجها." gradient="from-blue-500 to-cyan-500" delay={0.1} />
            <FeatureCard icon={Zap} title="سريع كالبرق" description="ما رح تستنى تحميل صفحات. اضغط الزر وخلال ثانية بتوصلك الأسعار." gradient="from-yellow-500 to-orange-500" delay={0.2} />
            <FeatureCard icon={Bell} title="نبهني لما يوصل السعر" description="حدد السعر يلي بدك ياه، ولما يوصل بنبعتلك إشعار. ما بتفوت عليك فرصة." gradient="from-purple-500 to-violet-500" delay={0.3} />
            <FeatureCard icon={RefreshCw} title="تحويل أي عملة" description="حول أي عملة لليرة السورية بضغطة زر. اختر العملة والمبلغ وخلص!" gradient="from-emerald-500 to-green-500" delay={0.4} />
            <FeatureCard icon={Shield} title="ما منسجل شي عنك" description="لا إيميل، لا رقم تلفون، ولا حتى اسمك. خصوصيتك محفوظة ١٠٠٪." gradient="from-accent to-yellow-500" delay={0.5} />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DEMO */}
      {/* ================================================================= */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-black mb-6">
                شوف كيف <span className="text-accent">بيشتغل</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-zinc-400 mb-8">
                كل شي بأزرار سهلة - ما في أوامر معقدة!
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
                {[
                  { btn: '💵 الأسعار', desc: 'شوف أسعار كل العملات' },
                  { btn: '🏙 المدينة', desc: 'غيّر مدينتك' },
                  { btn: '📊 كل العملات', desc: 'قائمة بكل العملات المتوفرة' },
                  { btn: '💱 تحويل', desc: 'حول أي عملة لليرة' },
                  { btn: '🥇 الذهب', desc: 'أسعار الذهب بكل العيارات' },
                  { btn: '🔔 تنبيه', desc: 'نبهني لما يوصل السعر' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm font-bold">{item.btn}</span>
                    <span className="text-zinc-400 text-sm">{item.desc}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="order-1 lg:order-2">
              <TelegramChat />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* TESTIMONIALS / Social Proof */}
      {/* ================================================================= */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-black mb-4">
              شو قالوا الناس؟
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'أحمد من دمشق', text: 'أخيراً شي سريع وبدون إعلانات! كل يوم بستخدمه. وميزة اختيار المدينة روعة!', emoji: '👨‍💼' },
              { name: 'سارة من حلب', text: 'البوت سهل كتير، حتى أمي صارت تستخدمه 😄 والأسعار دقيقة لحلب!', emoji: '👩' },
              { name: 'محمد من إدلب', text: 'ميزة التنبيهات روعة، ما عاد فوت علي سعر. وكل العملات موجودة!', emoji: '👨' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6"
              >
                <p className="text-zinc-300 mb-4">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-sm text-zinc-500">{item.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ */}
      {/* ================================================================= */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-black mb-4">
              أسئلة شائعة
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-400">
              عندك سؤال؟ يمكن الجواب هون
            </motion.p>
          </div>

          <div>
            <FAQItem 
              question="البوت فعلاً مجاني؟" 
              answer="إي والله! ١٠٠٪ مجاني وما في أي رسوم مخفية. استخدمه قديش ما بدك."
            />
            <FAQItem 
              question="كيف بختار مدينتي؟" 
              answer="اضغط على زر 'المدينة' وبتطلعلك قائمة بالمدن (دمشق، حلب، إدلب، الحسكة). اختر مدينتك والبوت بيحفظها للمرات الجاية."
            />
            <FAQItem 
              question="شو العملات المتوفرة؟" 
              answer="عنا أكثر من ١٧ عملة: الدولار، اليورو، التركي، الدرهم، الريال السعودي، الاسترليني، الدينار الأردني، الجنيه المصري، وغيرها كتير!"
            />
            <FAQItem 
              question="لازم سجل حساب؟" 
              answer="لأ أبداً! بس افتح البوت بالتيليجرام وابدأ استخدم. ما بنطلب منك أي معلومات."
            />
            <FAQItem 
              question="البوت بيشتغل بالليل؟" 
              answer="البوت شغال ٢٤ ساعة، ٧ أيام بالأسبوع. اسأل وقت ما بدك!"
            />
            <FAQItem 
              question="كيف ميزة التنبيهات بتشتغل؟" 
              answer="اضغط على زر 'تنبيه' وحدد السعر يلي بدك ياه. لما سعر الدولار يوصل هالرقم بنبعتلك إشعار فوراً."
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FINAL CTA */}
      {/* ================================================================= */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-b from-zinc-800/50 to-transparent border border-zinc-700/50 rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              جاهز تجرب؟
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              خلص الكلام، افتح البوت وشوف بنفسك!
            </p>
            <motion.a
              href="https://t.me/SyriFXBot"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-accent hover:bg-accent/90 text-black font-bold text-xl rounded-2xl"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.869 4.326-2.96-.924c-.643-.203-.657-.643.136-.953l11.566-4.458c.537-.194 1.006.131.833.939z"/>
              </svg>
              يلا افتح البوت!
              <ArrowLeft className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER */}
      {/* ================================================================= */}
      <footer className="py-6 border-t border-zinc-800/50 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xs font-bold text-white">س</span>
            </div>
            سيري إف إكس
            <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] rounded">v1.1.0</span>
          </div>
          <div>صُنع بـ ❤️ لسوريا 🇸🇾</div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  )
}
