# Question PDF Import System

This system allows you to import questions from properly formatted PDF files into the application's question bank.

## PDF Format Requirements

Your PDF file should follow this format:

```
1. Question text goes here
A) First option
B) Second option
C) Third option
D) Fourth option
Answer: A
Explanation: Optional explanation text goes here

2. Next question...
```

### Format Rules:

1. Questions must be numbered (1., 2., etc.)
2. Each option must start with A), B), C), or D)
3. The answer must be specified as "Answer: X" where X is A, B, C, or D
4. Explanation is optional but should start with "Explanation:"
5. Questions should be separated by blank lines

## How to Import Questions

1. Place your PDF file in the `question-pdfs` folder
2. Update the script in `scripts/importQuestions.ts` with your PDF details:

```typescript
const questions = await parseQuestionsFromPDF(pdfPath, {
  subject: 'Your Subject',
  topic: 'Your Topic',
  examType: 'UTME',  // or 'WAEC'
  difficulty: 'medium'  // 'easy', 'medium', or 'hard'
});
```

3. Run the import script:

```bash
pnpm ts-node scripts/importQuestions.ts
```

## Validation

The script will:
- Verify each question has exactly 4 options
- Check that answers reference valid options
- Ensure required fields are present
- Skip malformed questions with warnings

## Best Practices

1. Keep questions organized by subject and topic
2. Use clear, unambiguous language
3. Provide explanations for complex questions
4. Test the PDF import with a small sample first
5. Review the generated TypeScript file after import

## Error Handling

If the script encounters errors, it will:
1. Log specific error messages
2. Skip problematic questions
3. Continue processing remaining questions
4. Report total success/failure counts

See `template.txt` in the `question-pdfs` folder for a complete example.