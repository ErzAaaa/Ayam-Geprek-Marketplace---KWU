import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">Tentang Kami</h1>
            <p className="text-xl font-medium max-w-2xl mx-auto">Membawa kelezatan ayam geprek nusantara ke seluruh lapisan masyarakat dengan jaminan kualitas terbaik.</p>
          </div>
        </section>

        <section className="py-20 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-black uppercase mb-6">Hubungi Kami</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Alamat Pusat</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Jl. Ayam Geprek No. 123, Komplek Kuliner Merakyat,<br />
                    Jakarta Selatan, 12345, Indonesia
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Jam Operasional</h3>
                  <p className="text-muted-foreground">
                    Senin - Minggu: 09:00 - 22:00 WIB
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Telepon & Layanan Pesan Antar</h3>
                  <p className="text-muted-foreground">
                    14022 / (021) 555-0123
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    corporate@ayamgeprekmerakyat.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full min-h-[400px] bg-muted rounded-2xl flex items-center justify-center border border-border">
            <span className="text-muted-foreground font-bold">[Google Maps Placeholder]</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
