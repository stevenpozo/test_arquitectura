// Script para convertir todos los .txt de src/data en un questions.json unificado
// Ejecuta: node src/data/generate-questions-json.js


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = __dirname;
const outputFile = path.join(dataDir, 'questions.json');


// Regex mejorado para opciones: A. B) C: D  etc.
const optionRegex = /^([A-D])[\).:\s]\s*(.*)$/i;
const answerRegex = /^ANSWER:?\s*([A-D])/i;


function parseTxtFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const questions = [];
  let current = null;
  let expectingOptions = false;
  let answerIndex = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    const oMatch = optionRegex.exec(line);
    const aMatch = answerRegex.exec(line);

    if (oMatch) {
      if (current) {
        current.options.push(oMatch[2]);
        expectingOptions = true;
      }
    } else if (aMatch && current) {
      const idx = aMatch[1].toUpperCase().charCodeAt(0) - 65;
      answerIndex = idx;
      // Validar pregunta completa
      if (
        current.question &&
        Array.isArray(current.options) &&
        current.options.length > 1 &&
        answerIndex >= 0 && answerIndex < current.options.length
      ) {
        questions.push({
          question: current.question,
          options: current.options,
          correctAnswer: answerIndex,
          answered: false,
          // id se asignará después
        });
      }
      current = null;
      expectingOptions = false;
      answerIndex = null;
    } else {
      // Si hay una pregunta previa sin respuesta, la descartamos (no debería pasar)
      if (current && !('correctAnswer' in current)) {
        // Si ya hay opciones, es una pregunta multi-línea, la unimos
        if (expectingOptions) {
          current.question += ' ' + line;
        } else {
          // Pregunta nueva
          current = {
            question: line,
            options: []
          };
          expectingOptions = false;
        }
      } else {
        // Nueva pregunta
        current = {
          question: line,
          options: []
        };
        expectingOptions = false;
      }
    }
  }
  return questions;
}

// Buscar todos los .txt en la carpeta data
const files = fs.readdirSync(dataDir)
  .filter(f => f.endsWith('.txt'));


let allQuestions = [];
for (const file of files) {
  const filePath = path.join(dataDir, file);
  const qs = parseTxtFile(filePath);
  allQuestions = allQuestions.concat(qs);
}

// Asignar id incremental
allQuestions = allQuestions.map((q, i) => ({ ...q, id: i + 1 }));

fs.writeFileSync(outputFile, JSON.stringify(allQuestions, null, 2), 'utf8');
console.log(`Generado ${outputFile} con ${allQuestions.length} preguntas en formato de quiz.`);
