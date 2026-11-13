-- CreateTable
CREATE TABLE "Palavra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jogador" TEXT NOT NULL,
    "palavraId" INTEGER NOT NULL,
    "letrasTentadas" TEXT NOT NULL DEFAULT '',
    "erros" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'em_andamento',
    "pontos" INTEGER NOT NULL DEFAULT 0,
    "criadaEm" TEXT NOT NULL DEFAULT '',
    "finalizadaEm" TEXT,
    CONSTRAINT "Partida_palavraId_fkey" FOREIGN KEY ("palavraId") REFERENCES "Palavra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Palavra_texto_key" ON "Palavra"("texto");
