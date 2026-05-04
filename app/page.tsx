"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, CalendarDays, CheckCircle2, Waves, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { 
  format, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, 
  eachDayOfInterval, addDays, isBefore, isAfter, startOfToday, addMonths
} from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

// 전 세계 국번 라이브러리 및 스타일
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const TOURS = [
  { 
    id: 'chichen', 
    name: "Chichén Clásico", 
    price: 50, 
    features: [
      "Transporte redondo desde su hotel",
      "Guía bilingüe certificado",
      "Comida regional estilo buffet",
      "Admisión al centro arqueologico Chichén Itzá",
      "Nado en cenote sagrado (Saamal)",
      "Visita por Valladolid, Yucatán"
    ],
    image: "chichen_3.webp"
  },
  { 
    id: 'cozumel', 
    name: "Cozumel Cielo", 
    price: 80, 
    features: [
      "Cruce de ferry redondo (Abierto)",
      "Paseo escénico en Catamarán",
      "Snorkel en Palancar / Colombia",
      "Visita a El Cielo y El Cielito",
      "Snack: Ceviche de pescado, 1 hot dog, fruta, guacamole y totopos",
      "Barra libre",
      "Puesta del sol con música en vivo"
    ],
    image: "cozumel_3.webp"
  },
  { 
    id: 'isla', 
    name: "Isla Mujeres", 
    price: 60, 
    features: [
      "Transporte redondo",
      "Paseo en catamarán + barra libre",
      "Snorkel en El Meco* (equipos incluidos)",
      "Almuerzo buffet",
      "Tiempo libre en club de playa + barra libre",
      "Tiempo libre en la isla",
      "Visita a Playa Norte"
    ],
    image: "isla mujeres_3.webp"
  },
];

export default function TourBookingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTour, setSelectedTour] = useState(TOURS[0]);
  
  const today = startOfToday();
  const maxDate = addDays(today, 90);
  const [currentMonth, setCurrentMonth] = useState(today); 
  const [selectedDate, setSelectedDate] = useState(today); 
  const [guests, setGuests] = useState(1);
  
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState<string | undefined>();

  const isFormValid = userName.trim().length > 0 && phone && phone.length > 5;

  const { calendarDays, monthStart } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return {
      calendarDays: eachDayOfInterval({ start: startDate, end: endDate }),
      monthStart
    };
  }, [currentMonth]);

  const handlePrevMonth = () => {
    const prevMonth = addMonths(currentMonth, -1);
    if (!isBefore(endOfMonth(prevMonth), today)) {
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (!isAfter(startOfMonth(nextMonth), maxDate)) {
      setCurrentMonth(nextMonth);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0f3d3e] font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- (Read-Only) */}
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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F8FAFC]" />
      </section>

      {/* --- TOUR SELECTION SECTION --- */}
      <section className="max-w-6xl mx-auto -mt-24 relative z-20 pb-32 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black flex items-center gap-2 text-[#0f3d3e]">
            <Waves className="text-[#00d1c1] animate-pulse" /> Selecciona tu Tour
          </h2>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
          {TOURS.map((tour) => (
            <motion.div 
              key={tour.id}
              whileHover={{ y: -10 }}
              className={cn(
                "flex md:flex-col bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl cursor-pointer border-[3px] transition-all relative overflow-hidden h-44 md:h-full",
                selectedTour.id === tour.id ? "border-[#00d1c1]" : "border-transparent opacity-95 hover:opacity-100"
              )}
              onClick={() => setSelectedTour(tour)}
            >
              <div className="w-36 md:w-full h-full md:h-52 shrink-0 relative">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                {selectedTour.id === tour.id && (
                  <div className="absolute top-4 right-4 text-[#00d1c1] md:block hidden">
                    <CheckCircle2 size={24} fill="#00d1c1" className="text-white" />
                  </div>
                )}
              </div>

              <div className="p-4 md:p-8 flex flex-col flex-grow justify-between overflow-hidden">
                <div>
                  <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-6 leading-tight truncate md:whitespace-normal">{tour.name}</h3>
                  <div className="hidden md:flex flex-col gap-3 mb-8">
                    {tour.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-[#00d1c1] shrink-0 mt-0.5" />
                        <span className="text-gray-500 text-xs font-bold leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Desde</span>
                    <span className="text-xl md:text-3xl font-black text-[#00d1c1]">${tour.price} <small className="text-[10px] md:text-xs text-gray-400">USD</small></span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedTour(tour); setIsBookingOpen(true); }}
                    className="bg-[#0f3d3e] text-white w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-[#00d1c1] transition-colors shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHATSAPP FLOATING BUTTON --- (Read-Only) */}
      <a href="https://wa.me/5219842087933" target="_blank" className="fixed bottom-10 right-10 z-[60] bg-[#25D366] text-white p-5 rounded-full shadow-[0_15px_30px_rgba(37,211,102,0.4)] flex items-center gap-2 hover:scale-110 transition-transform font-black text-sm uppercase tracking-tighter">
        <MessageCircle fill="white" />
        <span className="hidden md:inline">¿Alguna duda?</span>
      </a>

      {/* --- BOOKING MODAL --- (Read-Only) */}
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
              <button onClick={() => { setIsBookingOpen(false); setIsFinished(false); }} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={24} /></button>
            </div>

            <div className="p-8 max-w-xl mx-auto w-full">
              {!isFinished ? (
                <div className="space-y-8 pb-20">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#00d1c1]/5 border border-[#00d1c1]/10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2 font-black text-[#0f3d3e] text-[10px] uppercase tracking-[0.2em]">
                        <CalendarDays size={16} className="text-[#00d1c1]" /> 1. Elige tu fecha
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={handlePrevMonth} className="text-gray-400 hover:text-[#00d1c1] transition-colors"><ChevronLeft size={20} /></button>
                        <span className="font-black text-xs text-[#0f3d3e] uppercase">{format(currentMonth, "MMMM yyyy", { locale: es })}</span>
                        <button onClick={handleNextMonth} className="text-gray-400 hover:text-[#00d1c1] transition-colors"><ChevronRight size={20} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {["D", "L", "M", "M", "J", "V", "S"].map(d => (
                        <div key={d} className="h-8 flex items-center justify-center text-[10px] font-black text-gray-300">{d}</div>
                      ))}
                      {calendarDays.map((day, idx) => {
                        const isPast = isBefore(day, today);
                        const isTooFar = isAfter(day, maxDate);
                        const isDisabled = isPast || isTooFar;
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                          <button 
                            key={idx} 
                            disabled={isDisabled}
                            onClick={() => setSelectedDate(day)}
                            className={cn(
                              "h-11 w-11 mx-auto flex items-center justify-center rounded-2xl text-sm transition-all relative",
                              !isSameMonth(day, monthStart) && "opacity-0 pointer-events-none",
                              isDisabled ? "bg-gray-100 text-gray-300 cursor-not-allowed" : 
                              isSelected ? "bg-[#00d1c1] text-white font-black shadow-lg scale-110 z-10" : 
                              "hover:bg-gray-50 text-[#0f3d3e] font-semibold"
                            )}
                          >
                            {format(day, "d")}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 font-black text-xs uppercase tracking-tighter"><Users className="text-[#00d1c1]" /><span>Personas</span></div>
                      <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-2xl">
                        <button onClick={() => setGuests(Math.max(1, guests-1))} className="w-12 h-12 font-black text-xl text-[#0f3d3e]">-</button>
                        <span className="font-black text-xl w-6 text-center">{guests}</span>
                        <button onClick={() => setGuests(guests+1)} className="w-12 h-12 font-black text-xl text-[#0f3d3e]">+</button>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Tu Nombre Completo" 
                      className="w-full bg-white border border-[#00d1c1]/10 p-6 rounded-[2rem] outline-none focus:ring-2 focus:ring-[#00d1c1]/20 font-bold transition-all text-black" 
                    />
                    <div className="global-phone-input-container">
                      <PhoneInput
                        international
                        defaultCountry="MX"
                        value={phone}
                        onChange={setPhone}
                        placeholder="WhatsApp Number"
                        className="w-full bg-white border border-[#00d1c1]/10 p-6 rounded-[2rem] outline-none focus-within:ring-2 focus-within:ring-[#00d1c1]/20 font-bold transition-all text-black"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={!isFormValid}
                      onClick={() => setIsFinished(true)}
                      className={cn(
                        "w-full py-7 font-black rounded-[2.5rem] transition-all uppercase tracking-[0.2em] text-sm shadow-xl",
                        isFormValid 
                          ? "bg-[#00d1c1] text-white shadow-[0_20px_40px_rgba(0,209,193,0.3)] active:scale-95" 
                          : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                      )}
                    >
                      Confirmar Reserva
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-20">
                  <div className="w-24 h-24 bg-[#00d1c1] text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#00d1c1]/30">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter text-[#0f3d3e]">¡PEDIDO ENVIADO!</h2>
                  <p className="text-gray-500 font-medium mb-12">
                    Hola <strong>{userName}</strong>, <br />
                    Hemos recibido tu solicitud de reserva. <br />
                    Te contactaremos al <strong>{phone}</strong> vía WhatsApp <br /> 
                    en unos minutos para confirmar tu aventura.
                  </p>
                  <div className="bg-white p-8 rounded-[3rem] w-full text-left border border-[#00d1c1]/10 space-y-4 shadow-sm mb-12">
                    <p className="font-bold text-gray-400 text-xs uppercase tracking-widest border-b pb-4 mb-4">Resumen de Reserva</p>
                    <p className="font-black text-[#0f3d3e] flex justify-between text-sm"><span>Tour:</span> <span className="text-[#00d1c1]">{selectedTour.name}</span></p>
                    <p className="font-black text-[#0f3d3e] flex justify-between text-sm"><span>Fecha:</span> <span>{format(selectedDate, "d 'de' MMMM", { locale: es })}</span></p>
                    <p className="font-black text-[#0f3d3e] flex justify-between text-sm"><span>Personas:</span> <span>{guests}</span></p>
                    <p className="font-black text-[#0f3d3e] flex justify-between text-xl pt-4 border-t"><span>Total Estimado:</span> <span>${selectedTour.price * guests} USD</span></p>
                  </div>
                  <button onClick={() => { setIsBookingOpen(false); setIsFinished(false); }} className="text-[#00d1c1] font-black uppercase tracking-[0.2em] text-xs border-b-2 border-[#00d1c1] pb-1">Cerrar</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .global-phone-input-container .PhoneInputInput {
          outline: none;
          background: transparent;
          font-weight: bold;
          border: none;
          width: 100%;
          color: black;
        }
      `}</style>
    </main>
  );
}