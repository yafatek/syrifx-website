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
  DollarSign,
  Coins,
  MessageCircle,
  Clock,
  Search,
  CheckCircle2,
  ChevronLeft,
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
// TELEGRAM CHAT
// =============================================================================
function TelegramChat() {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', text: string, isTyping?: boolean}>>([])
  const [, setStep] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    
    const chatSequence = [
      { type: 'user' as const, text: '/rate' },
      { type: 'bot' as const, text: 'loading' },
      { type: 'bot' as const, text: 'rates' },
      { type: 'user' as const, text: '/convert 500' },
      { type: 'bot' as const, text: 'loading' },
      { type: 'bot' as const, text: 'convert' },
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
        } else if (currentStep.text === 'convert') {
          setMessages(msgs => {
            const newMsgs = msgs.filter(m => !m.isTyping)
            return [...newMsgs, { type: 'bot', text: 'convert' }]
          })
        } else {
          setMessages(msgs => [...msgs, currentStep])
        }
        return prev + 1
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <div className="relative mx-auto w-[280px]">
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
            <div className="h-[320px] p-3 space-y-2 overflow-hidden">
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
                      <div className="bg-zinc-800 rounded-2xl rounded-br-sm p-3 max-w-[85%]">
                        <div className="text-accent text-xs font-bold mb-2 flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          أسعار اليوم
                        </div>
                        <div className="space-y-1.5 text-xs">
                          {[
                            { flag: '🇺🇸', name: 'دولار', rate: '12,025' },
                            { flag: '🇪🇺', name: 'يورو', rate: '12,650' },
                            { flag: '🥇', name: 'ذهب', rate: '485,000' },
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between gap-4">
                              <span className="text-zinc-400">{item.flag} {item.name}</span>
                              <span className="font-mono text-white" dir="ltr">{item.rate}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[9px] text-zinc-500 mt-2 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                          منذ ٣ دقائق
                        </div>
                      </div>
                    ) : msg.text === 'convert' ? (
                      <div className="bg-zinc-800 rounded-2xl rounded-br-sm p-3">
                        <div className="text-accent text-xs font-bold mb-2">💱 تحويل</div>
                        <div className="bg-zinc-900 rounded-xl p-2 text-center">
                          <div className="text-zinc-400 text-[10px]">$500 =</div>
                          <div className="text-xl font-black text-white" dir="ltr">6,012,500</div>
                          <div className="text-accent text-xs font-bold">ليرة سورية</div>
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="p-2 bg-zinc-900 border-t border-zinc-800">
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
            مجاني • بدون إعلانات • بدون تسجيل
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            بدك تعرف سعر الدولار؟
            <br />
            <span className="text-accent">خلال ثانية!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl mx-auto"
          >
            بوت تيليجرام بيعطيك سعر الصرف والذهب بشكل فوري.
            <br />
            <span className="text-white">بس افتح التيليجرام واكتب الأمر!</span>
          </motion.p>

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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <CurrencyCard currency="الدولار" flag="🇺🇸" rate="12,025" change={2.4} delay={0.4} />
            <CurrencyCard currency="اليورو" flag="🇪🇺" rate="12,650" change={1.8} delay={0.5} />
            <CurrencyCard currency="الذهب" flag="🥇" rate="485,000" change={-0.5} delay={0.6} />
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
              { value: 24, suffix: '/٧', label: 'شغال كل الوقت' },
              { value: 5, suffix: ' دقايق', label: 'بتحدث الأسعار' },
              { value: 100, suffix: '%', label: 'ببلاش' },
              { value: 0, suffix: '', label: 'بدون تعقيد' },
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
              icon={Search}
              title="اكتب الأمر" 
              description="اكتب /rate لتشوف الأسعار، أو /convert 100 لتحول مبلغ. بسيطة!"
            />
            <StepCard 
              number={3} 
              icon={CheckCircle2}
              title="خلص! بس هيك" 
              description="البوت بيرد عليك خلال ثانية بالأسعار المحدثة. بتقدر تسأل قديش ما بدك."
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
            <FeatureCard icon={Zap} title="سريع كالبرق" description="ما رح تستنى تحميل صفحات. اكتب الأمر وخلال ثانية بتوصلك الأسعار." gradient="from-yellow-500 to-orange-500" delay={0} />
            <FeatureCard icon={Bell} title="نبهني لما يوصل السعر" description="حدد السعر يلي بدك ياه، ولما يوصل بنبعتلك إشعار. ما بتفوت عليك فرصة." gradient="from-blue-500 to-cyan-500" delay={0.1} />
            <FeatureCard icon={Shield} title="ما منسجل شي عنك" description="لا إيميل، لا رقم تلفون، ولا حتى اسمك. خصوصيتك محفوظة ١٠٠٪." gradient="from-emerald-500 to-green-500" delay={0.2} />
            <FeatureCard icon={Clock} title="شغال ٢٤ ساعة" description="الساعة ٣ بالليل وبدك تعرف السعر؟ البوت جاهز. ما بينام!" gradient="from-purple-500 to-pink-500" delay={0.3} />
            <FeatureCard icon={Coins} title="كل العملات بمكان واحد" description="دولار، يورو، تركي، وحتى أسعار الذهب بكل العيارات. كلو بأمر واحد." gradient="from-accent to-yellow-500" delay={0.4} />
            <FeatureCard icon={DollarSign} title="حول أي مبلغ" description="بدك تعرف ١٠٠٠ دولار قديش بالليرة؟ اكتب الأمر وبيطلعلك." gradient="from-rose-500 to-red-500" delay={0.5} />
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
                هي الأوامر يلي بتقدر تستخدمها:
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
                {[
                  { cmd: '/rate', desc: 'شوف كل الأسعار' },
                  { cmd: '/convert 100', desc: 'حول ١٠٠ دولار لليرة' },
                  { cmd: '/gold', desc: 'أسعار الذهب' },
                  { cmd: '/alert 13000', desc: 'نبهني لما الدولار يصير ١٣٠٠٠' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <code className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-accent font-mono text-sm">{item.cmd}</code>
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
              { name: 'أحمد من دمشق', text: 'أخيراً شي سريع وبدون إعلانات! كل يوم بستخدمه.', emoji: '👨‍💼' },
              { name: 'سارة من حلب', text: 'البوت سهل كتير، حتى أمي صارت تستخدمه 😄', emoji: '👩' },
              { name: 'محمد من اللاذقية', text: 'ميزة التنبيهات روعة، ما عاد فوت علي سعر.', emoji: '👨' },
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
              question="من وين بتجيبوا الأسعار؟" 
              answer="منجمع الأسعار من عدة مصادر موثوقة بالسوق السورية، وبنحدثها كل ٥ دقايق."
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
              answer="اكتب /alert ١٣٠٠٠ مثلاً، ولما سعر الدولار يوصل هالرقم بنبعتلك إشعار فوراً."
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
          </div>
          <div>صُنع بـ ❤️ لسوريا 🇸🇾</div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  )
}
