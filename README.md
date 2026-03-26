# Todo List Frontend-applikation

En applikation för att skapa en "att göra"-lista, byggd med React och TypeScript som kommunicerar
med ett REST API för att hantera CRUD-operationer.

**Länk till API:** [https://labb2-backend.onrender.com/api/todos](https://labb2-backend.onrender.com/api/todos)

## Teknikstack
- React
- TypeScript
- Vite
- CSS

## Installation

1. **Klona repot:**
```bash
git clone https://github.com/rare2400/labb2-todo.git
cd todo-list
```

2. **Installera beroenden:**
```bash
   npm install
```

3. **Starta utvecklingsservern:**
```bash
   npm run dev
```

## Funktioner
- Visa alla todos
- Lägga till en ny uppgift med formulärvalidering
- Uppdatera status på en uppgift
- Ta bort en uppgift
- Laddnings- och felmeddelanden vid API-anrop
- Responsiv design för både desktop och mobil

## Komponenter
`App.tsx` – Rotkompontent som hanterar state och API-anrop     
`TodoForm.tsx` – Formulär för att lägga till en ny todo    
`TodoList.tsx` – Listar alla todos       
`TodoItem.tsx` – Visar en enskild todo med actions för att uppdatera status och ta bort todo     

## Formulärvalidering
- Titel måste vara minst 3 tecken
- Beskrivning är valfri men får max vara 200 tecken

## Skapad av
Skapad som en del av en skoluppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz      
[rare2400@student.miun.se](rare2400@student.miun.se)      
2026-03-26
