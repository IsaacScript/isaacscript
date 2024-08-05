import { testFormatText } from "./format.js";

test("Hyphen list", () => {
  const text = `
List of fruits:
- Apple
- Banana
- Pear
  `;
  testFormatText(text);
});

test("Number period list", () => {
  const text = `
List of fruits:
1. Apple
2. Banana
3. Pear
  `;
  testFormatText(text);
});

test("Number parenthesis list", () => {
  const text = `
List of fruits:
1) Apple
2) Banana
3) Pear
  `;
  testFormatText(text);
});

test("Hyphen list with single overflow", () => {
  const text = `
List of things:
- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
give you a complete account of the system
- and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one
rejects, dislikes, or avoids pleasure itself, because it is pleasure
  `;
  const formattedText = `
List of things:
- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
  born and I will give you a complete account of the system
- and expound the actual teachings of the great explorer of the truth, the master-builder of human
  happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure
  `;
  testFormatText(text, formattedText);
});

test("Hyphen list with lots of overflow", () => {
  const text = `
List of things:
- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.
- Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?
- But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  const formattedText = `
List of things:
- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
  born and I will give you a complete account of the system, and expound the actual teachings of the
  great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
  avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue
  pleasure rationally encounter consequences that are extremely painful.
- Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is
  pain, but because occasionally circumstances occur in which toil and pain can procure him some
  great pleasure. To take a trivial example, which of us ever undertakes laborious physical
  exercise, except to obtain some advantage from it?
- But who has any right to find fault with a man who chooses to enjoy a pleasure that has no
  annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  testFormatText(text, formattedText);
});

test("Number period list with single overflow", () => {
  const text = `
List of things:
1. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
give you a complete account of the system
2. and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one
rejects, dislikes, or avoids pleasure itself, because it is pleasure
  `;
  const formattedText = `
List of things:
1. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
   born and I will give you a complete account of the system
2. and expound the actual teachings of the great explorer of the truth, the master-builder of human
   happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure
  `;
  testFormatText(text, formattedText);
});

test("Number period list with lots of overflow", () => {
  const text = `
List of things:
1. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.
2. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?
3. But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  const formattedText = `
List of things:
1. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
   born and I will give you a complete account of the system, and expound the actual teachings of
   the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
   or avoids pleasure itself, because it is pleasure, but because those who do not know how to
   pursue pleasure rationally encounter consequences that are extremely painful.
2. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is
   pain, but because occasionally circumstances occur in which toil and pain can procure him some
   great pleasure. To take a trivial example, which of us ever undertakes laborious physical
   exercise, except to obtain some advantage from it?
3. But who has any right to find fault with a man who chooses to enjoy a pleasure that has no
   annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  testFormatText(text, formattedText);
});

test("Number parenthesis list with single overflow", () => {
  const text = `
List of things:
1) But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
give you a complete account of the system
2) and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one
rejects, dislikes, or avoids pleasure itself, because it is pleasure
  `;
  const formattedText = `
List of things:
1) But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
   born and I will give you a complete account of the system
2) and expound the actual teachings of the great explorer of the truth, the master-builder of human
   happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure
  `;
  testFormatText(text, formattedText);
});

test("Number parenthesis list with lots of overflow", () => {
  const text = `
List of things:
1) But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.
2) Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?
3) But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  const formattedText = `
List of things:
1) But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
   born and I will give you a complete account of the system, and expound the actual teachings of
   the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
   or avoids pleasure itself, because it is pleasure, but because those who do not know how to
   pursue pleasure rationally encounter consequences that are extremely painful.
2) Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is
   pain, but because occasionally circumstances occur in which toil and pain can procure him some
   great pleasure. To take a trivial example, which of us ever undertakes laborious physical
   exercise, except to obtain some advantage from it?
3) But who has any right to find fault with a man who chooses to enjoy a pleasure that has no
   annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  testFormatText(text, formattedText);
});

test("Hyphen list with newlines between everything", () => {
  const text = `
List of things:

- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.

- Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?

- But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  const formattedText = `
List of things:

- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
  born and I will give you a complete account of the system, and expound the actual teachings of the
  great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
  avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue
  pleasure rationally encounter consequences that are extremely painful.

- Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is
  pain, but because occasionally circumstances occur in which toil and pain can procure him some
  great pleasure. To take a trivial example, which of us ever undertakes laborious physical
  exercise, except to obtain some advantage from it?

- But who has any right to find fault with a man who chooses to enjoy a pleasure that has no
  annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  testFormatText(text, formattedText);
});

test("Hyphen list with sub-bullets", () => {
  const text = `
List of things:
- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.
  - Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?
- But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  const formattedText = `
List of things:
- But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
  born and I will give you a complete account of the system, and expound the actual teachings of the
  great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
  avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue
  pleasure rationally encounter consequences that are extremely painful.
  - Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it
    is pain, but because occasionally circumstances occur in which toil and pain can procure him
    some great pleasure. To take a trivial example, which of us ever undertakes laborious physical
    exercise, except to obtain some advantage from it?
- But who has any right to find fault with a man who chooses to enjoy a pleasure that has no
  annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  `;
  testFormatText(text, formattedText);
});

test("Hyphen list with a list item that looks like a number parenthesis list", () => {
  const text = `
Pattern can be any of the following:

- '*a': reads from the socket until the connection is closed. No end-of-line translation is
  performed.
- '*l': reads a line of text from the socket. The line is marked/denoted by an LF character (ASCII
  10), optionally preceded by a CR character (ASCII 13). The CR and LF characters are not included in the returned line. In fact, all CR characters are ignored by the pattern.
- number: causes the method to read a specified number of bytes from the socket.
  `;
  const formattedText = `
Pattern can be any of the following:

- '*a': reads from the socket until the connection is closed. No end-of-line translation is
  performed.
- '*l': reads a line of text from the socket. The line is marked/denoted by an LF character (ASCII
  10), optionally preceded by a CR character (ASCII 13). The CR and LF characters are not included
  in the returned line. In fact, all CR characters are ignored by the pattern.
- number: causes the method to read a specified number of bytes from the socket.
  `;
  testFormatText(text, formattedText);
});

test("Text block that looks like a number period list", () => {
  const text = `
This function will crash the program if you provide an invalid argument, such as 1000000000000000 or
43. Thus, you should basically never call this function, since it is very unstable and could lead to
undefined behavior.
  `;
  testFormatText(text);
});
