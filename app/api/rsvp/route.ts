import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Importa a instância única

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Dados recebidos no backend:", body);

    const { name, companion, pizza } = body;

    if (!name || !pizza) {
      return NextResponse.json({ error: "Nome e sabor de pizza são obrigatórios!" }, { status: 400 });
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        companion,
        pizza,
      },
    });

    console.log("RSVP salvo no banco de dados:", rsvp);

    return NextResponse.json({ message: "RSVP enviado com sucesso!", rsvp });
  } catch (error) {
    console.error("Erro ao salvar RSVP:", error);
    return NextResponse.json({ error: "Erro ao enviar RSVP!" }, { status: 500 });
  }
}
