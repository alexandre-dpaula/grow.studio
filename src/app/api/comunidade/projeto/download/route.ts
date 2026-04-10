import { NextResponse } from "next/server";

type DownloadProject = {
  sourceUrl: string;
  fileName: string;
};

const DOWNLOAD_PROJECTS: Record<string, DownloadProject> = {
  "landing-page-01": {
    sourceUrl: "https://growstudio.vercel.app/treinamentos/crie-paginas",
    fileName: "landing-page-01-crie-paginas.html",
  },
  "landing-page-02": {
    sourceUrl: "https://growstudio.vercel.app/treinamentos/proprio-comercial",
    fileName: "landing-page-02-proprio-comercial.html",
  },
  "landing-page-03": {
    sourceUrl: "https://growstudio.vercel.app/treinamentos/ensaios-fotograficos",
    fileName: "landing-page-03-ensaios-fotograficos.html",
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  const project = DOWNLOAD_PROJECTS[id];

  if (!project) {
    return NextResponse.json(
      { error: "Projeto inválido para download." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(project.sourceUrl, {
      cache: "no-store",
      headers: {
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar projeto: ${response.status}`);
    }

    const html = await response.text();

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${project.fileName}"`,
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível baixar o projeto agora. Tente novamente." },
      { status: 502 },
    );
  }
}
