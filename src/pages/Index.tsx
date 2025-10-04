import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    foodName: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const analyzeFood = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        calories: 420,
        protein: 28,
        carbs: 45,
        fats: 12,
        foodName: 'Куриное филе с рисом',
      });
      setAnalyzing(false);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-muted/20 to-secondary/10">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Flame" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CalorID
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-foreground/70 hover:text-foreground transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-foreground/70 hover:text-foreground transition-colors">
                Тарифы
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-foreground/70 hover:text-foreground transition-colors">
                FAQ
              </button>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg">
              Начать
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight">
                Твой AI-помощник
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  по калориям
                </span>
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Сфотографируй еду — получи точный подсчёт КБЖУ за секунды. 
                Искусственный интеллект распознаёт продукты и считает калории автоматически.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg text-lg px-8"
                  onClick={() => scrollToSection('upload')}
                >
                  Попробовать бесплатно
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Как это работает
                  <Icon name="PlayCircle" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-primary">98%</div>
                  <div className="text-sm text-foreground/60">Точность AI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-secondary">50K+</div>
                  <div className="text-sm text-foreground/60">Пользователей</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-accent">2сек</div>
                  <div className="text-sm text-foreground/60">Анализ фото</div>
                </div>
              </div>
            </div>

            <div className="animate-scale-in" id="upload">
              <Card className="shadow-2xl border-2 overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-heading font-semibold mb-6">Загрузи фото еды</h3>
                  
                  {!preview ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary transition-all cursor-pointer bg-muted/20"
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <Icon name="Camera" size={40} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">Нажми или перетащи фото</p>
                            <p className="text-sm text-foreground/60 mt-2">PNG, JPG до 10MB</p>
                          </div>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative rounded-2xl overflow-hidden">
                        <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
                      </div>
                      
                      {!results ? (
                        <Button
                          onClick={analyzeFood}
                          disabled={analyzing}
                          className="w-full bg-gradient-to-r from-secondary to-accent text-white text-lg py-6 shadow-lg"
                        >
                          {analyzing ? (
                            <>
                              <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                              Анализирую...
                            </>
                          ) : (
                            <>
                              <Icon name="Zap" className="mr-2" size={20} />
                              Анализировать
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="space-y-4 animate-slide-up">
                          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6">
                            <h4 className="font-heading font-semibold text-lg mb-2">{results.foodName}</h4>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-3xl font-heading font-bold text-primary">{results.calories}</div>
                                <div className="text-sm text-foreground/60">Калории</div>
                              </div>
                              <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-3xl font-heading font-bold text-secondary">{results.protein}г</div>
                                <div className="text-sm text-foreground/60">Белки</div>
                              </div>
                              <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-3xl font-heading font-bold text-accent">{results.carbs}г</div>
                                <div className="text-sm text-foreground/60">Углеводы</div>
                              </div>
                              <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-3xl font-heading font-bold text-primary">{results.fats}г</div>
                                <div className="text-sm text-foreground/60">Жиры</div>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              setPreview('');
                              setResults(null);
                              setSelectedFile(null);
                            }}
                            variant="outline"
                            className="w-full"
                          >
                            Загрузить новое фото
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-heading font-bold mb-12">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Icon name="Camera" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold">1. Сфотографируй</h3>
              <p className="text-foreground/70">Сделай фото еды или загрузи из галереи</p>
            </div>
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                <Icon name="Sparkles" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold">2. AI анализирует</h3>
              <p className="text-foreground/70">Нейросеть распознаёт продукты за 2 секунды</p>
            </div>
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <Icon name="BarChart3" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-heading font-semibold">3. Получи результат</h3>
              <p className="text-foreground/70">Точный подсчёт калорий, белков, жиров и углеводов</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-muted/20 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Выбери свой тариф</h2>
            <p className="text-xl text-foreground/70">Гибкие планы для твоих целей</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-bold">Бесплатный</h3>
                  <div className="text-4xl font-heading font-bold">
                    0₽
                    <span className="text-lg text-foreground/60 font-normal">/месяц</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-secondary mt-1" />
                      <span>5 анализов в день</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-secondary mt-1" />
                      <span>Базовая статистика</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-secondary mt-1" />
                      <span>История за 7 дней</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    Начать бесплатно
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl border-2 border-primary relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-1 rounded-full text-sm font-medium">
                Популярный
              </div>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-bold">Про</h3>
                  <div className="text-4xl font-heading font-bold">
                    490₽
                    <span className="text-lg text-foreground/60 font-normal">/месяц</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span className="font-medium">Безлимитные анализы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span className="font-medium">Детальная статистика</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span className="font-medium">История без ограничений</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span className="font-medium">Экспорт данных</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span className="font-medium">Персональные рекомендации</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                    Выбрать Про
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-bold">Премиум</h3>
                  <div className="text-4xl font-heading font-bold">
                    990₽
                    <span className="text-lg text-foreground/60 font-normal">/месяц</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-accent mt-1" />
                      <span className="font-medium">Всё из тарифа Про</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-accent mt-1" />
                      <span className="font-medium">Приоритетная поддержка</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-accent mt-1" />
                      <span className="font-medium">Интеграция с фитнес-трекерами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-accent mt-1" />
                      <span className="font-medium">План питания от AI</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    Выбрать Премиум
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-foreground/70">Всё, что нужно знать о CalorID</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-muted/20">
              <AccordionTrigger className="text-lg font-heading hover:no-underline">
                Насколько точен AI-анализ калорий?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Наш AI достигает 98% точности в распознавании продуктов и подсчёте КБЖУ. 
                Мы обучили модель на базе из более чем 500 000 блюд и постоянно улучшаем алгоритмы.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-muted/20">
              <AccordionTrigger className="text-lg font-heading hover:no-underline">
                Можно ли использовать CalorID без интернета?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Для анализа фотографий требуется интернет-соединение, так как обработка происходит на наших серверах. 
                Однако вы можете просматривать историю анализов офлайн.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-2xl px-6 bg-muted/20">
              <AccordionTrigger className="text-lg font-heading hover:no-underline">
                Распознаёт ли приложение сложные блюда?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Да! CalorID умеет распознавать как отдельные продукты, так и сложные блюда из нескольких ингредиентов. 
                AI анализирует состав и рассчитывает КБЖУ с учётом всех компонентов.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-2xl px-6 bg-muted/20">
              <AccordionTrigger className="text-lg font-heading hover:no-underline">
                Как отменить подписку?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Отменить подписку можно в любой момент в настройках аккаунта. 
                Доступ к функциям сохранится до конца оплаченного периода.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-2xl px-6 bg-muted/20">
              <AccordionTrigger className="text-lg font-heading hover:no-underline">
                Есть ли мобильное приложение?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Да, CalorID доступен как веб-приложение и для iOS/Android. 
                Все данные синхронизируются между устройствами автоматически.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="bg-accent text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Flame" className="text-white" size={24} />
                </div>
                <span className="text-2xl font-heading font-bold">CalorID</span>
              </div>
              <p className="text-white/70">
                AI-помощник для подсчёта калорий по фотографиям
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Политика</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 CalorID. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
