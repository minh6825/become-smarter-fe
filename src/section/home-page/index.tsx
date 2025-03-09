import Link from "next/link"
import Image from "next/image"
import { BookOpen, FileText, Sparkles, GraduationCap, ChevronRight, Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "./footer"

export default function LandingPage() {
  // random 1 to  8 
  const random = Math.floor(Math.random() * 8) + 1
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-primary-main-background to-primary-foreground">
        <div className="absolute inset-0 opacity-50">
          <Image src={`/background/${random}.png`} width={1920} height={1080} alt="Background pattern"  className="object-contain w-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary-main-background text-primary-blue hover:bg-primary-main-background/80">
              Nền tảng học tập số 1
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-blue">
              Nền Tảng thi trắc nghiệm số 1 Việt Nam
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-text">
              Ôn tập là dễ giúp bạn tạo, quản lý và chia sẻ bộ đề một cách nhanh chóng và dễ dàng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary-blue hover:bg-primary-blue/90 text-primary-text-button">
                <Link href="/list-quiz" className="flex items-center">
                  Bắt Đầu Ngay <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-2">Tính năng</Badge>
            <h2 className="text-3xl font-bold mb-4">Tính Năng Nổi Bật</h2>
            <p className="text-primary-text max-w-2xl mx-auto">
              Khám phá các công cụ mạnh mẽ giúp việc học tập trở nên hiệu quả hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-border-color hover:border-primary-blue/30 transition-all hover:shadow-lg bg-item-background">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary-main-background p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary-blue" />
                </div>
                <CardTitle>Làm Đề Trắc Nghiệm</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-text text-center">
                  Trải nghiệm làm bài thi với hàng ngàn đề trắc nghiệm chất lượng cao
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border-color hover:border-primary-blue/30 transition-all hover:shadow-lg bg-item-background">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary-main-background p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary-blue" />
                </div>
                <CardTitle>Tạo Bộ Từ Vựng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-text text-center">
                  Dễ dàng tạo và học các bộ từ vựng theo chủ đề với công cụ thông minh
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border-color hover:border-primary-blue/30 transition-all hover:shadow-lg bg-item-background">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary-main-background p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-primary-blue" />
                </div>
                <CardTitle>Đọc Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-text text-center">
                  Cập nhật kiến thức mới nhất qua các bài viết chuyên sâu từ chuyên gia
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border-color hover:border-primary-blue/30 transition-all hover:shadow-lg bg-item-background">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary-main-background p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-primary-blue" />
                </div>
                <CardTitle>Tính Năng Sắp Ra Mắt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-text text-center">
                  Nhiều tính năng mới đang được phát triển để nâng cao trải nghiệm học tập
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Quizzes Section */}
      <section className="py-20 bg-primary-main-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Đề thi</Badge>
            <h2 className="text-3xl font-bold mb-4">Bài Tập Trắc Nghiệm Phổ Biến</h2>
            <p className="text-primary-text max-w-2xl mx-auto">
              Luyện tập với các đề thi được nhiều người sử dụng nhất
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((item) => (
                <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full bg-item-background">
                    <CardHeader>
                      <CardTitle>Đề thi {item}</CardTitle>
                      <CardDescription>Môn học: Toán học</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary-text">
                        Bộ đề trắc nghiệm gồm 30 câu hỏi về đại số và hình học
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="text-sm">4.8</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Làm bài
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="text-center mt-8">
            <Button variant="outline">
              <Link href="/list-quiz" className="flex items-center">
                Xem tất cả đề thi <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vocabulary Sets Section */}
      <section className="py-20 bg-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Từ vựng</Badge>
            <h2 className="text-3xl font-bold mb-4">Bộ Từ Vựng Phổ Biến</h2>
            <p className="text-primary-text max-w-2xl mx-auto">
              Học từ vựng hiệu quả với các bộ từ được biên soạn kỹ lưỡng
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((item) => (
                <CarouselItem key={item} className="md:basis-1/2 lg:basis-[33.3%] ">
                  <Card className="h-full bg-item-background">
                    <CardHeader>
                      <CardTitle>Bộ từ vựng {item}</CardTitle>
                      <CardDescription>Chủ đề: Tiếng Anh giao tiếp</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary-text">100 từ vựng thông dụng trong giao tiếp hàng ngày</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-primary-text/70">500+ lượt học</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Học ngay
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="text-center mt-8">
            <Button variant="outline">
              <Link href="/vocabulary" className="flex items-center">
                Xem tất cả bộ từ vựng <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-primary-main-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Blog</Badge>
            <h2 className="text-3xl font-bold mb-4">Bài Viết Phổ Biến</h2>
            <p className="text-primary-text max-w-2xl mx-auto">
              Cập nhật kiến thức mới nhất qua các bài viết chất lượng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden bg-item-background hover:shadow-lg transition-all">
                <div className="relative h-48">
                  <Image
                    src={`/logo.png`}
                    alt={`Blog post ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Học tập</Badge>
                    <span className="text-xs text-primary-text/70">12 Tháng 3, 2025</span>
                  </div>
                  <CardTitle>Phương pháp học tập hiệu quả</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-text line-clamp-3">
                    Khám phá các phương pháp học tập hiệu quả giúp bạn tiết kiệm thời gian và đạt kết quả cao trong các
                    kỳ thi
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="text-primary-blue p-0 hover:bg-transparent hover:text-primary-blue/80"
                  >
                    <Link href={`/blog/post-${item}`} className="flex items-center">
                      Đọc tiếp <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary">
              <Link href="/blog" className="flex items-center">
                Xem tất cả bài viết <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-item-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-2">Giới thiệu</Badge>
              <h2 className="text-3xl font-bold mb-6">Về Ôn Tập Là Dễ</h2>
            </div>

            <div className="bg-item-background rounded-xl shadow-md p-8 md:p-12">
              <p className="text-lg text-primary-text mb-6">
                Ôn tập là dễ là nền tảng được thiết kế để hỗ trợ học viên và giáo viên trong việc quản lý tài nguyên học
                tập. Với giao diện thân thiện và công cụ mạnh mẽ, chúng tôi cam kết mang lại trải nghiệm tuyệt vời.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-primary-blue font-bold text-4xl mb-2">10K+</div>
                  <p className="text-primary-text">Người dùng</p>
                </div>
                <div className="text-center">
                  <div className="text-primary-blue font-bold text-4xl mb-2">5K+</div>
                  <p className="text-primary-text">Bộ đề thi</p>
                </div>
                <div className="text-center">
                  <div className="text-primary-blue font-bold text-4xl mb-2">1K+</div>
                  <p className="text-primary-text">Bộ từ vựng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-blue text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bắt đầu hành trình học tập ngay hôm nay</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Tham gia cùng hàng ngàn người dùng khác và trải nghiệm nền tảng học tập hiệu quả nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link href="/register" className="flex items-center">
                Đăng ký miễn phí
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contact" className="flex items-center">
                Liên hệ với chúng tôi
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Liên Hệ</h2>
          <p className="text-primary-text mb-8 max-w-xl mx-auto">
            Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi ngay!
          </p>
          <a
            href="mailto:minhnqdeveloper@gmail.com"
            className="inline-flex items-center bg-primary-blue text-primary-text-button px-6 py-3 rounded-md hover:bg-primary-blue/90 transition"
          >
            Gửi Email
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

