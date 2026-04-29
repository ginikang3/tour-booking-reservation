"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, CalendarDays, CheckCircle2, Waves, MessageCircle, ChevronRight } from "lucide-react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval 
} from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

// 1. 투어 상품 데이터
const TOURS = [
  { id: 'snorkel', name: "Snorkel Tour", price: 50, desc: "Explora los arrecifes más bellos de Cancún." },
  { id: 'isla', name: "Isla Mujeres Tour", price: 80, desc: "Un día inolvidable en catamarán por el Caribe." },
  { id: 'sunset', name: "Sunset Tour", price: 60, desc: "Disfruta el atardecer con bebidas y música." },
];

export default function TourBookingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTour, setSelectedTour] = useState(TOURS[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [guests, setGuests] = useState(1);

  // 달력 계산 로직
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0f3d3e] font-sans overflow-x-hidden">
      {/* --- HERO SECTION: 배경을 /beach-bg.jpg로 고정 --- */}
      <section className="relative h-[75vh] flex flex-col items-center justify-center text-center px-6">
        <div className="z-10 mt-[-50px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] uppercase leading-none"
          >
            MAREA DE <br /> <span className="text-[#00d1c1]">VENUS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-white text-lg md:text-xl font-bold mb-8 drop-shadow-lg italic opacity-90"
          >
            Explora la magia de Cancún con nosotros
          </motion.p>
        </div>
        
        {/* 직접 다운로드해서 넣은 배경 이미지 참조 */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/beach-bg.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F8FAFC]" />
      </section>

      {/* --- TOUR SELECTION SECTION --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-24 relative z-20 pb-32">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black flex items-center gap-2 text-[#0f3d3e]">
            <Waves className="text-[#00d1c1] animate-pulse" /> Selecciona tu Tour
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOURS.map((tour) => (
            <motion.div 
              key={tour.id}
              whileHover={{ y: -10 }}
              className={cn(
                "bg-white p-8 rounded-[3rem] shadow-2xl cursor-pointer border-[3px] transition-all relative overflow-hidden",
                selectedTour.id === tour.id ? "border-[#00d1c1]" : "border-transparent opacity-90 hover:opacity-100"
              )}
              onClick={() => setSelectedTour(tour)}
            >
              {selectedTour.id === tour.id && (
                <div className="absolute top-6 right-6 text-[#00d1c1]">
                  <CheckCircle2 size={24} fill="#00d1c1" className="text-white" />
                </div>
              )}
              <h3 className="text-2xl font-black mb-3">{tour.name}</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">{tour.desc}</p>
              
              <div className="flex justify-between items-end mt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Desde</span>
                  <span className="text-3xl font-black text-[#00d1c1]">${tour.price} <small className="text-xs text-gray-400">USD</small></span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedTour(tour); setIsBookingOpen(true); }}
                  className="bg-[#0f3d3e] text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-[#00d1c1] transition-colors shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHATSAPP FLOATING BUTTON --- */}
      <a 
        href="https://wa.me/521" // 여기에 멕시코 번호만 넣으면 끝
        target="_blank"
        className="fixed bottom-10 right-10 z-[60] bg-[#25D366] text-white p-5 rounded-full shadow-[0_15px_30px_rgba(37,211,102,0.4)] flex items-center gap-2 hover:scale-110 transition-transform font-black text-sm uppercase tracking-tighter"
      >
        <MessageCircle fill="white" />
        <span className="hidden md:inline">¿Alguna duda?</span>
      </a>

      {/* --- BOOKING MODAL --- */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#f0f9f9] flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 bg-white border-b sticky top-0 z-10">
              <span className="font-black text-[#00d1c1] tracking-tighter uppercase text-sm">
                Reservar: <span className="text-[#0f3d3e]">{selectedTour.name}</span>
              </span>
              <button onClick={() => setIsBookingOpen(false)} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={24} /></button>
            </div>

            <div className="p-8 max-w-xl mx-auto w-full">
              {!isFinished ? (
                <div className="space-y-8">
                  {/* Step 1: Date */}
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#00d1c1]/5 border border-[#00d1c1]/10">
                    <div className="flex items-center gap-2 mb-8 font-black text-[#0f3d3e] text-[10px] uppercase tracking-[0.2em]">
                      <CalendarDays size={16} className="text-[#00d1c1]" /> 1. Elige tu fecha
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, idx) => (
                        <button 
                          key={idx} onClick={() => setSelectedDate(day)}
                          className={cn(
                            "h-11 w-11 mx-auto flex items-center justify-center rounded-2xl text-sm transition-all",
                            !isSameMonth(day, monthStart) && "text-gray-200",
                            isSameDay(day, selectedDate) ? "bg-[#00d1c1] text-white font-black shadow-lg scale-110" : "hover:bg-gray-50 text-gray-600 font-semibold"
                          )}
                        >
                          {format(day, "d")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Guest & Contact */}
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 font-black text-xs uppercase tracking-tighter"><Users className="text-[#00d1c1]" /><span>Personas</span></div>
                      <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-2xl">
                        <button onClick={() => setGuests(Math.max(1, guests-1))} className="w-12 h-12 font-black text-xl text-[#0f3d3e]">-</button>
                        <span className="font-black text-xl w-6 text-center">{guests}</span>
                        <button onClick={() => setGuests(guests+1)} className="w-12 h-12 font-black text-xl text-[#0f3d3e]">+</button>
                      </div>
                    </div>
                    <input type="text" placeholder="Tu Nombre Completo" className="w-full bg-white border border-[#00d1c1]/10 p-6 rounded-[2rem] outline-none focus:ring-2 focus:ring-[#00d1c1]/20 font-bold transition-all" />
                    <input type="tel" placeholder="WhatsApp (Ej: +52 1...)" className="w-full bg-white border border-[#00d1c1]/10 p-6 rounded-[2rem] outline-none focus:ring-2 focus:ring-[#00d1c1]/20 font-bold transition-all" />
                  </div>

                  {/* CTA */}
                  <div className="pt-4 pb-20">
                    <button 
                      onClick={() => setIsFinished(true)}
                      className="w-full py-7 bg-[#00d1c1] text-white font-black rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,209,193,0.3)] active:scale-95 transition-all uppercase tracking-[0.2em] text-sm"
                    >
                      Confirmar Reserva
                    </button>
                    <p className="mt-6 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                      Sin pago previo. Te contactaremos por WhatsApp <br /> para confirmar disponibilidad.
                    </p>
                  </div>
                </div>
              ) : (
                /* --- SUCCESS STATE --- */
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-20">
                  <div className="w-24 h-24 bg-[#00d1c1] text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#00d1c1]/30">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter text-[#0f3d3e]">¡RECIBIDO!</h2>
                  <p className="text-gray-500 font-medium mb-12">Te escribiremos a WhatsApp en unos minutos <br /> para confirmar tu aventura.</p>
                  
                  <div className="bg-white p-8 rounded-[3rem] w-full text-left border border-[#00d1c1]/10 space-y-4 shadow-sm mb-12">
                    <p className="font-bold text-gray-400 text-xs uppercase tracking-widest border-b pb-4 mb-4">Detalles del Tour</p>
                    <p className="font-black text-[#0f3d3e] flex justify-between"><span>Tour:</span> <span className="text-[#00d1c1]">{selectedTour.name}</span></p>
                    <p className="font-black text-[#0f3d3e] flex justify-between"><span>Fecha:</span> <span>{format(selectedDate, "d 'de' MMMM", { locale: es })}</span></p>
                    <p className="font-black text-[#0f3d3e] flex justify-between text-xl pt-4 border-t"><span>Total:</span> <span>${selectedTour.price * guests} USD</span></p>
                  </div>
                  
                  <button onClick={() => setIsBookingOpen(false)} className="text-[#00d1c1] font-black uppercase tracking-[0.2em] text-xs border-b-2 border-[#00d1c1] pb-1">Cerrar</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}