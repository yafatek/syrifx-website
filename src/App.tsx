import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Bell, 
  Zap, 
  Shield, 
  Globe, 
  Clock,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

// Feature data
const features = [
  {
    icon: TrendingUp,
    title: "أسعار فورية",
    description: "تحديثات كل 5 دقائق من مصادر موثوقة للسوق السوداء والرسمي",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Bell,
    title: "تنبيهات ذكية",
    description: "احصل على إشعار فوري عندما يصل السعر لهدفك",
    color: "text-syrian-green",
    bgColor: "bg-syrian-green/10",
  },
  {
    icon: Zap,
    title: "سريع وخفيف",
    description: "مبني على تقنية Rust للحصول على ردود فورية",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "آمن وموثوق",
    description: "لا نخزن أي بيانات شخصية - خصوصيتك أولويتنا",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Globe,
    title: "متعدد العملات",
    description: "دولار، يورو، ليرة تركية، وأسعار الذهب",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: Clock,
    title: "متاح 24/7",
    description: "البوت يعمل على مدار الساعة بدون توقف",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
  },
]

// Commands data
const commands = [
  { cmd: "/rate", desc: "عرض أسعار الصرف الحالية", alias: "/سعر" },
  { cmd: "/convert", desc: "تحويل المبالغ بين العملات", alias: "/تحويل" },
  { cmd: "/gold", desc: "أسعار الذهب اليوم", alias: "/ذهب" },
  { cmd: "/alert", desc: "إنشاء تنبيه لسعر معين", alias: "/تنبيه" },
  { cmd: "/help", desc: "عرض المساعدة", alias: "/مساعدة" },
]

// Stats
const stats = [
  { value: "٢٤/٧", label: "متاح دائماً" },
  { value: "٥ دق", label: "تحديث مستمر" },
  { value: "مجاني", label: "بدون رسوم" },
  { value: "فوري", label: "رد سريع" },
]

function App() {
  return (
    <div className="min-h-screen bg-background pattern-bg overflow-x-hidden">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Gradient orbs for ambiance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="glass border-b border-border/50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl font-bold text-white">س</span>
              </div>
              <span className="text-xl font-bold">سيري إف إكس</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button variant="glow" size="sm" asChild>
                <a href="https://t.me/SyriFXBot" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  ابدأ الآن
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <Badge variant="accent" className="mb-6 text-sm px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 ml-1.5" />
                مجاني بالكامل
              </Badge>
            </motion.div>

            {/* Main headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              أسعار الصرف السورية
              <br />
              <span className="text-gradient">لحظة بلحظة</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              بوت تيليجرام لمتابعة سعر صرف الليرة السورية مقابل الدولار واليورو والذهب
              <br />
              <span className="text-foreground">سريع • موثوق • مجاني</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button variant="glow" size="xl" asChild className="w-full sm:w-auto">
                <a href="https://t.me/SyriFXBot" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  افتح في تيليجرام
                  <ArrowLeft className="h-5 w-5 mr-2" />
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild className="w-full sm:w-auto">
                <a href="#features">
                  اكتشف المزيد
                  <ChevronDown className="h-5 w-5 mr-1" />
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              لماذا <span className="text-gradient">سيري إف إكس</span>؟
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              صُمم خصيصاً للسوريين لتوفير أدق المعلومات بأسرع وقت
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full card-glow group cursor-default">
                  <CardContent className="p-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
                      feature.bgColor
                    )}>
                      <feature.icon className={cn("h-7 w-7", feature.color)} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commands Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                أوامر <span className="text-gradient">سهلة</span> وبسيطة
              </h2>
              <p className="text-lg text-muted-foreground">
                استخدم هذه الأوامر للحصول على المعلومات التي تحتاجها
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              {commands.map((command, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6">
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <code className="font-mono text-lg font-bold text-accent bg-accent/10 px-4 py-2 rounded-lg">
                            {command.cmd}
                          </code>
                          <span className="text-muted-foreground text-sm">
                            أو
                          </span>
                          <code className="font-mono text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg">
                            {command.alias}
                          </code>
                        </div>
                        <div className="sm:mr-auto text-muted-foreground">
                          {command.desc}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo/Preview Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              شاهد <span className="text-gradient">كيف يعمل</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm mx-auto"
          >
            {/* Phone mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-card rounded-[3rem] p-3 border border-border shadow-2xl">
                {/* Phone notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-full" />
                
                {/* Screen */}
                <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* Telegram-like UI */}
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-primary/90 p-4 pt-12 text-primary-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-lg font-bold">س</span>
                        </div>
                        <div>
                          <div className="font-bold">سيري إف إكس</div>
                          <div className="text-xs opacity-75">متصل الآن</div>
                        </div>
                      </div>
                    </div>

                    {/* Chat */}
                    <div className="flex-1 p-4 space-y-3 bg-muted/30">
                      {/* User message */}
                      <div className="flex justify-start">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                          /rate
                        </div>
                      </div>

                      {/* Bot response */}
                      <div className="flex justify-end">
                        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm">
                          <div className="font-bold mb-2">📊 أسعار الصرف</div>
                          <div className="space-y-1 font-mono text-xs">
                            <div className="flex justify-between gap-4">
                              <span>🇺🇸 دولار</span>
                              <span className="text-accent">١٢,٠٢٥ ل.س</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>🇪🇺 يورو</span>
                              <span className="text-accent">١٢,٦٥٠ ل.س</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>🥇 ذهب ٢١</span>
                              <span className="text-accent">٤٨٥,٠٠٠ ل.س</span>
                            </div>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-2">
                            آخر تحديث: منذ ٣ دقائق
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-border bg-card">
                      <div className="bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
                        اكتب رسالة...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            >
              جاهز لمتابعة <span className="text-gradient">الأسعار</span>؟
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-10"
            >
              انضم للآلاف من السوريين الذين يتابعون أسعار الصرف معنا
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button variant="glow" size="xl" asChild>
                <a href="https://t.me/SyriFXBot" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  ابدأ الآن مجاناً
                  <ArrowLeft className="h-5 w-5 mr-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xs font-bold text-white">س</span>
              </div>
              <span>سيري إف إكس</span>
            </div>
            <div>
              صُنع بـ ❤️ لسوريا 🇸🇾
            </div>
            <div>
              © {new Date().getFullYear()} جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
