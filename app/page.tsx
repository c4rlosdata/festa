"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, PartyPopper, User, Pizza } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

export default function BirthdayRSVP() {
  const [name, setName] = useState("");
  const [companion, setCompanion] = useState("alone");
  const [pizza, setPizza] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const eventDate = new Date("2025-02-01T19:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    } else {
      setTimeLeft("O evento já começou! 🎉");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => calculateTimeLeft(), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConfirm = async () => {
    if (!name || !pizza) {
      alert("Por favor, preencha seu nome e o sabor de pizza preferido.");
      return;
    }

    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, companion, pizza }),
      });

      setIsConfirmed(true);
    } catch (error) {
      console.error("Erro ao enviar RSVP:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1918F] text-gray-100 p-4 flex flex-col items-center justify-between">
      <Card className="w-full max-w-md shadow-lg border border-gray-700 bg-gray-800 rounded-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2 text-[#809DEA]">
            <PartyPopper className="w-8 h-8 text-[#809DEA]" />
            Niver Carlos!
          </CardTitle>
          <p className="text-gray-300">Venha celebrar comigo amassando umas pizzas!</p>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#809DEA] mt-1" />
              <div>
                <h3 className="font-semibold text-gray-100">Local</h3>
                <p className="text-sm text-gray-300">
                  Avenida jornalista Ricardo marinho, 150
                  <br />
                  Barra da Tijuca
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#809DEA] mt-1" />
              <div>
                <h3 className="font-semibold text-gray-100">Data</h3>
                <p className="text-sm text-gray-300">01 de fevereiro de 2025</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#809DEA] mt-1" />
              <div>
                <h3 className="font-semibold text-gray-100">Horário</h3>
                <p className="text-sm text-gray-300">19:00 às 00:00</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-700" />

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-100">
                Seu nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 border-gray-700 focus:border-[#809DEA] focus:ring-[#809DEA] text-gray-100 bg-gray-700 placeholder-gray-400 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="companion" className="text-sm font-medium text-gray-100">
                Acompanhante
              </label>
              <div className="relative">
                <Select
                  value={companion}
                  onValueChange={setCompanion}
                  className="text-gray-100 bg-gray-700 border border-gray-700 rounded-lg shadow-sm focus:border-[#809DEA] focus:ring-[#809DEA] hover:border-[#809DEA]"
                >
                  <SelectItem
                    value="alone"
                    className="px-4 py-2 hover:bg-[#809DEA] hover:text-gray-100"
                  >
                    Vou sozinho(a)
                  </SelectItem>
                  <SelectItem
                    value="plus-one"
                    className="px-4 py-2 hover:bg-[#809DEA] hover:text-gray-100"
                  >
                    Vou com acompanhante
                  </SelectItem>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="pizza" className="text-sm font-medium text-gray-100">
                Sabor de pizza preferido
              </label>
              <div className="relative">
                <Pizza className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="pizza"
                  placeholder="Digite aqui"
                  value={pizza}
                  onChange={(e) => setPizza(e.target.value)}
                  className="pl-10 h-12 border-gray-700 focus:border-[#809DEA] focus:ring-[#809DEA] text-gray-100 bg-gray-700 placeholder-gray-400 rounded-lg"
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#809DEA] hover:bg-[#809DEA]/90 text-white font-semibold rounded-lg"
              onClick={handleConfirm}
            >
              {isConfirmed ? "Confirmado! 🎉" : "Confirmar Presença!"}
            </Button>

            {/* Timer */}
            {isConfirmed && (
              <p className="text-center text-lg font-semibold text-[#809DEA] mt-4">
                Tempo restante: {timeLeft}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="text-sm text-gray-500 mt-4">
        © 2025 Nexus
      </footer>
    </div>
  );
}
