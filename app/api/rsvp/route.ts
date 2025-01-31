import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Dados recebidos no backend:", body); // Log dos dados recebidos

    const { name, companion, pizza } = body;

    // Validação simples
    if (!name || !pizza) {
      console.error("Erro: Nome ou sabor de pizza não fornecidos."); // Log do erro
      return NextResponse.json({ error: "Nome e sabor de pizza são obrigatórios!" }, { status: 400 });
    }

    // Salvar no banco de dados
    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        companion,
        pizza,
      },
    });

    console.log("RSVP salvo no banco de dados:", rsvp); // Log do sucesso

    return NextResponse.json({ message: "RSVP enviado com sucesso!", rsvp });
  } catch (error) {
    console.error("Erro ao salvar RSVP:", error); // Log do erro detalhado
    return NextResponse.json({ error: "Erro ao enviar RSVP!" }, { status: 500 });
  }
}
