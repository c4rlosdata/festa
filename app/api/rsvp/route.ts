import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, companion, pizza } = body;

    // Validação básica
    if (!name || !pizza) {
      return NextResponse.json(
        { error: "Nome e sabor de pizza são obrigatórios!" },
        { status: 400 }
      );
    }

    // Salvar no banco de dados
    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        companion,
        pizza,
      },
    });

    return NextResponse.json({ message: "RSVP enviado com sucesso!", rsvp });
  } catch (error) {
    console.error("Erro ao enviar RSVP:", error);
    return NextResponse.json(
      { error: "Erro ao enviar RSVP!" },
      { status: 500 }
    );
  }
}
