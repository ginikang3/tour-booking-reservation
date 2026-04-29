"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Users, Compass, CheckCircle2, Waves } from "lucide-react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval 
} from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function TourBookingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);

  const tourTimes = ["09:00 AM", "11:30 AM", "02:00 PM"];
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <main className="min-h-screen bg-white text-[#0f3d3e] font-sans overflow-x-hidden">
      {/* --- HERO SECTION: 박스 제거하고 텍스트에 그림자 효과 --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="z-10"
        >
          <div className="flex justify-center mb-6 text-white drop-shadow-lg">
            <Waves size={48} className="animate-bounce" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] leading-none">
            MAREA DE <br /> <span className="text-[#00d1c1]">VENUS</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-bold mb-12 max-w-lg mx-auto drop-shadow-md">
            Explora Isla Mujeres, Chichén Itzá y los cenotes más mágicos con nosotros.
          </p>
          <button 
            onClick={() => { setIsBookingOpen(true); setIsFinished(false); }}
            className="px-14 py-6 bg-[#00d1c1] text-white font-black rounded-full hover:bg-white hover:text-[#00d1c1] transition-all transform hover:scale-110 uppercase text-sm tracking-[0.2em] shadow-2xl"
          >
            Reservar Ahora
          </button>
        </motion.div>

        {/* 배경 이미지 (인스타 감성 바다) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </section>

      {/* --- BOOKING MODAL --- */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed inset-0 z-50 bg-[#F0F9F9] flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 bg-white border-b border-[#00d1c1]/10 sticky top-0 z-10">
              <span className="font-black text-[#00d1c1] tracking-tighter text-xl uppercase">Marea de Venus</span>
              <button onClick={() => setIsBookingOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"><X size={24} /></button>
            </div>

            <div className="p-8 max-w-xl mx-auto w-full">
              {!isFinished ? (
                <div className="space-y-8">
                  <div className="text-center mb-4">
                    <h2 className="text-3xl font-black tracking-tight text-[#0f3d3e]">¡Tu Aventura Comienza!</h2>
                    <p className="text-gray-500 font-medium">Selecciona tu fecha y prepárate para la magia.</p>
                  </div>

                  <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-[#00d1c1]/5 border border-[#00d1c1]/10">
                    <div className="flex items-center justify-between mb-8 px-2 font-bold">
                      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeft /></button>
                      <span className="capitalize text-lg">{format(currentMonth, "MMMM yyyy", { locale: es })}</span>
                      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, idx) => (
                        <button 
                          key={idx} onClick={() => setSelectedDate(day)}
                          className={cn(
                            "h-11 w-11 mx-auto flex items-center justify-center rounded-2xl text-sm transition-all",
                            !isSameMonth(day, monthStart) && "text-gray-200",
                            isSameDay(day, selectedDate) ? "bg-[#00d1c1] text-white font-bold shadow-lg scale-110" : "hover:bg-[#f0f9f9] text-gray-600"
                          )}
                        >
                          {format(day, "d")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 font-bold"><Users className="text-[#00d1c1]" /><span>Personas</span></div>
                      <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-xl">
                        <button onClick={() => setGuests(Math.max(1, guests-1))} className="w-10 h-10 font-bold">-</button>
                        <span className="font-black text-lg w-6 text-center">{guests}</span>
                        <button onClick={() => setGuests(guests+1)} className="w-10 h-10 font-bold">+</button>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 space-y-4 shadow-sm">
                      <div className="flex items-center gap-3 font-bold"><Compass className="text-[#00d1c1]" /><span>Sesión</span></div>
                      <div className="grid grid-cols-3 gap-2">
                        {tourTimes.map(t => (
                          <button 
                            key={t} onClick={() => setSelectedTime(t)}
                            className={cn(
                              "py-4 rounded-2xl text-[10px] font-black transition-all border",
                              selectedTime === t ? "bg-[#0f3d3e] text-white border-[#0f3d3e]" : "bg-white text-gray-400 border-gray-100 hover:border-[#00d1c1]"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pb-20 mt-4">
                    <input type="text" placeholder="Nombre" className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all" />
                    <input type="tel" placeholder="WhatsApp" className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all" />
                    <button 
                      onClick={() => setIsFinished(true)}
                      disabled={!selectedTime}
                      className="w-full py-6 bg-[#00d1c1] text-white font-black rounded-[2rem] shadow-xl shadow-[#00d1c1]/30 active:scale-95 transition-all mt-4 uppercase tracking-widest"
                    >
                      Confirmar Reserva
                    </button>
                  </div>
                </div>
              ) : (
                /* --- SUCCESS STATE (예약 완료) --- */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-24 h-24 bg-[#00d1c1] text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#00d1c1]/40">
                    <CheckCircle2 size={50} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter text-[#0f3d3e] mb-4 uppercase">¡Todo Listo!</h2>
                  <p className="text-gray-500 font-medium max-w-[280px] mb-12">
                    Te hemos enviado un mensaje de confirmación a tu **WhatsApp**. ¡Nos vemos pronto!
                  </p>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-[#00d1c1]/10 w-full text-left space-y-4 shadow-sm">
                    <div className="pb-4 border-b border-gray-50"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Experiencia</p></div>
                    <p className="font-bold text-[#0f3d3e]">📅 {format(selectedDate, "d 'de' MMMM", { locale: es })}</p>
                    <p className="font-bold text-[#0f3d3e]">⏰ {selectedTime}</p>
                    <p className="font-bold text-[#0f3d3e]">👥 {guests} {guests > 1 ? 'Viajeros' : 'Viajero'}</p>
                  </div>
                  <button 
                    onClick={() => setIsBookingOpen(false)}
                    className="mt-12 text-[#00d1c1] font-black text-xs uppercase tracking-widest border-b-2 border-[#00d1c1] pb-1"
                  >
                    Cerrar
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}