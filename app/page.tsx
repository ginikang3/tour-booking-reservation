"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, CalendarDays, CheckCircle2, Waves, MessageCircle, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import { 
  format, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, 
  eachDayOfInterval, addDays, isBefore, isAfter, startOfToday, addMonths
} from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

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
      "Snack: Ceviche, Guacamole y más",
      "Barra libre a bordo",
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
      "Tiempo libre en club de playa",
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
    if (!isBefore(endOfMonth(prevMonth), today)) setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (!isAfter(startOfMonth(nextMonth), maxDate)) setCurrentMonth(nextMonth);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0f3d3e] font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] flex flex-col items-center justify-center text-center px-6">
        <div className="z-10 mt-[-50px]">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] uppercase leading-none">
            MAREA DE <br /> <span className="text-[#00d1c1]">VENUS</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white text-lg md:text-xl font-bold mb-8 drop-shadow-lg italic opacity-90">
            Explora la magia de Cancún con nosotros
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F8FAFC]" />
      </section>

      {/* --- TOUR LIST SECTION --- */}
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
              onClick={() => { setSelectedTour(tour); setIsBookingOpen(true); }}
            >
              <div className="w-36 md:w-full h-full md:h-52 shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full md:hidden">
                  <span className="text-[10px] font-black text-[#00d1c1]">DETALLES</span>
                </div>
              </div>

              <div className="p-4 md:p-8 flex flex-col flex-grow justify-between overflow-hidden">
                <div>
                  <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-6 leading-tight truncate md:whitespace-normal">{tour.name}</h3>
                  <div className="hidden md:flex flex-col gap-3 mb-8">
                    {tour.features.slice(0, 4).map((feature, index) => (
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
                  <div className="bg-[#0f3d3e] text-white w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHATSAPP FLOATING BUTTON --- */}
      <a href="https://wa.me/5219842087933" target="_blank" className="fixed bottom-10 right-10 z-[60] bg-[#25D366] text-white p-5 rounded-full shadow-[0_15px_30px_rgba(37,211,102,0.4)] flex items-center gap-2 hover:scale-110 transition-transform font-black text-sm uppercase tracking-tighter">
        <MessageCircle fill="white" />
        <span className="hidden md:inline">¿Alguna duda?</span>
      </a>

      {/* --- EXPANDED BOOKING MODAL --- */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-md border-b sticky top-0 z-20">
              <span className="font-black text-[#0f3d3e] tracking-tighter uppercase text-sm">
                Detalles del Tour
              </span>
              <button onClick={() => { setIsBookingOpen(false); setIsFinished(false); }} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={24} /></button>
            </div>

            <div className="flex flex-col pb-24">
              {!isFinished ? (
                <>
                  <div className="relative w-full h-[40vh] md:h-[50vh]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedTour.image} className="w-full h-full object-cover" alt={selectedTour.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <h2 className="text-4xl font-black text-[#0f3d3e] uppercase tracking-tighter drop-shadow-sm">{selectedTour.name}</h2>
                      <p className="text-[#00d1c1] font-black text-xl">${selectedTour.price} USD <span className="text-gray-400 text-xs font-bold uppercase">por persona</span></p>
                    </div>
                  </div>

                  <div className="px-6 space-y-10 -mt-4 relative z-10">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#00d1c1]/10">
                      <h3 className="flex items-center gap-2 font-black text-[#0f3d3e] uppercase tracking-widest text-xs mb-6">
                        <CheckCircle2 size={18} className="text-[#00d1c1]" /> ¿Qué incluye?
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTour.features.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#00d1c1]/10 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 size={12} className="text-[#00d1c1]" />
                            </div>
                            <span className="text-gray-600 text-sm font-bold leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* No Incluye section was here - DELETED per request */}

                    <div className="space-y-6 pt-6">
                      <h3 className="flex items-center gap-2 font-black text-[#0f3d3e] uppercase tracking-widest text-xs">
                        <CalendarDays size={18} className="text-[#00d1c1]" /> Selecciona Fecha y Personas
                      </h3>
                      
                      <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-[#00d1c1]/5">
                        <div className="flex items-center justify-between mb-6 px-2">
                          <button onClick={handlePrevMonth} className="p-2"><ChevronLeft size={20} /></button>
                          <span className="font-black text-xs uppercase">{format(currentMonth, "MMMM yyyy", { locale: es })}</span>
                          <button onClick={handleNextMonth} className="p-2"><ChevronRight size={20} /></button>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((day, idx) => {
                            const isPast = isBefore(day, today);
                            const isDisabled = isPast || isAfter(day, maxDate);
                            const isSelected = isSameDay(day, selectedDate);
                            return (
                              <button 
                                key={idx} 
                                disabled={isDisabled}
                                onClick={() => setSelectedDate(day)}
                                className={cn(
                                  "h-10 w-10 mx-auto flex items-center justify-center rounded-xl text-xs transition-all",
                                  !isSameMonth(day, monthStart) && "opacity-0",
                                  isDisabled ? "text-gray-200" : isSelected ? "bg-[#00d1c1] text-white font-black" : "font-bold text-[#0f3d3e]"
                                )}
                              >
                                {format(day, "d")}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-5 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between">
                          <span className="font-black text-xs uppercase"><Users size={16} className="inline mr-2 text-[#00d1c1]"/>Personas</span>
                          <div className="flex items-center gap-4">
                            <button onClick={() => setGuests(Math.max(1, guests-1))} className="w-10 h-10 font-black text-xl">-</button>
                            <span className="font-black text-lg">{guests}</span>
                            <button onClick={() => setGuests(guests+1)} className="w-10 h-10 font-black text-xl">+</button>
                          </div>
                        </div>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Tu Nombre" className="w-full bg-white border border-[#00d1c1]/10 p-6 rounded-[2rem] font-bold text-black" />
                        <div className="global-phone-input-container">
                          <PhoneInput international defaultCountry="MX" value={phone} onChange={setPhone} placeholder="WhatsApp" className="w-full bg-white border border-[#00d1c1]/10 p-6 rounded-[2rem] font-bold text-black" />
                        </div>
                      </div>

                      <button 
                        disabled={!isFormValid}
                        onClick={() => setIsFinished(true)}
                        className={cn(
                          "w-full py-7 font-black rounded-[2.5rem] uppercase tracking-widest text-sm shadow-2xl transition-all",
                          isFormValid ? "bg-[#00d1c1] text-white shadow-[#00d1c1]/30 active:scale-95" : "bg-gray-200 text-gray-400"
                        )}
                      >
                        Confirmar Reserva
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Success View - RESTORED & UPDATED with Summary Info */
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-20 px-6">
                  <div className="w-24 h-24 bg-[#00d1c1] text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#00d1c1]/30">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter text-[#0f3d3e]">¡PEDIDO ENVIADO!</h2>
                  <p className="text-gray-500 font-medium mb-12">
                    Hola <strong>{userName}</strong>, <br />
                    Te contactaremos al <strong>{phone}</strong> vía WhatsApp <br /> 
                    en unos minutos para confirmar tu aventura.
                  </p>
                  
                  {/* Reservation Detail Card */}
                  <div className="bg-gray-50 p-8 rounded-[3rem] w-full text-left border border-[#00d1c1]/10 space-y-4 shadow-sm mb-12">
                    <p className="font-bold text-gray-400 text-[10px] uppercase tracking-widest border-b pb-4 mb-4">Resumen de Reserva</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-black text-gray-400 uppercase text-[10px]">Tour</span>
                      <span className="font-black text-[#00d1c1]">{selectedTour.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-black text-gray-400 uppercase text-[10px]">Fecha</span>
                      <span className="font-black text-[#0f3d3e]">{format(selectedDate, "d 'de' MMMM", { locale: es })}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-black text-gray-400 uppercase text-[10px]">Personas</span>
                      <span className="font-black text-[#0f3d3e]">{guests}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-black text-gray-400 uppercase text-[10px]">Total Estimado</span>
                      <span className="font-black text-[#0f3d3e] text-xl">${selectedTour.price * guests} USD</span>
                    </div>
                  </div>

                  <button onClick={() => { setIsBookingOpen(false); setIsFinished(false); }} className="text-[#00d1c1] font-black uppercase tracking-widest text-xs border-b-2 border-[#00d1c1] pb-1">Cerrar</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .global-phone-input-container .PhoneInputInput {
          outline: none; background: transparent; font-weight: bold; border: none; width: 100%; color: black;
        }
      `}</style>
    </main>
  );
}