import { testFormatText } from "./format.js";

test("Exactly 100 characters", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was bo
  `;
  testFormatText(text);
});

test("Exactly 101 characters", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was bor
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
bor
  `;
  testFormatText(text, formattedText);
});

test("Exactly 100 characters with an extra line", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was bo
and I will give you a complete account of the system
  `;
  testFormatText(text);
});

test("1 line to 2", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
born and I will give you a complete account of the system
  `;
  testFormatText(text, formattedText);
});

test("1 line to 3", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound the actual teachings of the great explorer of the truth
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
born and I will give you a complete account of the system and expound the actual teachings of the
great explorer of the truth
  `;
  testFormatText(text, formattedText);
});

test("2 lines to 1", () => {
  const text = `
But I must explain to you
how all this mistaken idea of denouncing pleasure
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure
  `;
  testFormatText(text, formattedText);
});

test("2 lines to 3", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
give you a complete account of the system and expound the actual teachings of the great explorer of the truth
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
born and I will give you a complete account of the system and expound the actual teachings of the
great explorer of the truth
  `;
  testFormatText(text, formattedText);
});

test("3 lines to 2", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure
and praising pain was born and I will give you a complete account of the system and
expound the actual teachings of the
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
born and I will give you a complete account of the system and expound the actual teachings of the
  `;
  testFormatText(text, formattedText);
});

test("4 lines to 5", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder
of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how
to pursue pleasure rationally encounter consequences that are extremely painful.
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
born and I will give you a complete account of the system, and expound the actual teachings of the
great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue
pleasure rationally encounter consequences that are extremely painful.
  `;
  testFormatText(text, formattedText);
});

test("Multiple sections", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born

and I will give you a complete account of the system, and expound the actual teachings of the great explorer
of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself


because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to
obtain pain of itself, because it is pain, but because occasionally circumstances occur
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
born

and I will give you a complete account of the system, and expound the actual teachings of the great
explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids
pleasure itself

because it is pleasure, but because those who do not know how to pursue pleasure rationally
encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or
desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur
  `;
  testFormatText(text, formattedText);
});

test("Leading newline", () => {
  const text =
    "\nBut I must explain to you how all this mistaken idea of denouncing";
  const formattedText =
    "But I must explain to you how all this mistaken idea of denouncing";
  testFormatText(text, formattedText, false);
});

test("2 leading newlines", () => {
  const text =
    "\n\nBut I must explain to you how all this mistaken idea of denouncing";
  const formattedText =
    "But I must explain to you how all this mistaken idea of denouncing";
  testFormatText(text, formattedText, false);
});

test("Line that goes past ruler", () => {
  const text = `
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  `;
  testFormatText(text);
});

test("Line that goes past ruler with overflow", () => {
  const text = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA I will give you a complete account of the system
  `;
  const formattedText = `
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
born and
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
I will give you a complete account of the system
  `;
  testFormatText(text, formattedText);
});

test("2 spaces between words", () => {
  const text = `
dog  cat
  `;
  const formattedText = `
dog cat
  `;
  testFormatText(text, formattedText);
});

test("URL does not get merged with 2 lines", () => {
  const text = `
Go to this website:
https://stackoverflow.com/
  `;
  testFormatText(text);
});

test("URL does not get merged with 3 lines", () => {
  const text = `
Go to this website:
https://stackoverflow.com/
And you will find the information that you seek.
  `;
  testFormatText(text);
});

test("e.g. does not get merged", () => {
  const text = `
The contents of JSDoc tag header, if any.
e.g. "@param foo This is foo." would be "@param foo".
  `;
  testFormatText(text);
});

test("e.g. in parenthesis does not get merged", () => {
  const text = `
The contents of JSDoc tag header, if any.
(e.g. "@param foo This is foo." would be "@param foo".)
  `;
  testFormatText(text);
});

test("i.e. does not get merged", () => {
  const text = `
The contents of JSDoc tag header, if any.
i.e. "@param foo This is foo." would be "@param foo".
  `;
  testFormatText(text);
});

test("i.e. in parenthesis does not get merged", () => {
  const text = `
The contents of JSDoc tag header, if any.
(i.e. "@param foo This is foo." would be "@param foo".)
  `;
  testFormatText(text);
});

test("Code blocks with newline separator", () => {
  const text = `
This is my example:

\`\`\`
const foo = 123;
const bar = 456;
function fooFunction() {
  barFunction();
}



const baz = 789;
\`\`\`

It is a good example.
  `;
  testFormatText(text);
});

test("Code blocks with long text", () => {
  const text = `
This is my example:

\`\`\`
But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound the actual teachings of the great explorer of the truth
\`\`\`
  `;
  testFormatText(text);
});

test("Code blocks without newline separator", () => {
  const text = `
This is my example:
\`\`\`
const foo = 123;
\`\`\`
It is a good example.
  `;
  const formattedText = `
This is my example:

\`\`\`
const foo = 123;
\`\`\`

It is a good example.
  `;
  testFormatText(text, formattedText);
});

test("JSDoc tags normal", () => {
  const text = `
Here is my function.

@param bar But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
I will give you a complete account of the system, and expound the actual teachings of the great
@returns explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
  `;
  const formattedText = `
Here is my function.

@param bar But I must explain to you how all this mistaken idea of denouncing pleasure and praising
           pain was born and I will give you a complete account of the system, and expound the
           actual teachings of the great
@returns explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
         avoids pleasure explorer of the truth, the master-builder of human happiness. No one
         rejects, dislikes, or avoids pleasure itself
  `;
  testFormatText(text, formattedText);
});

test("JSDoc tags with long variable names", () => {
  const text = `
Here is my function.

@param thisIsAReallyLongVariableNameThatGoesToHalfTheScreen But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
I will give you a complete account of the system, and expound the actual teachings of the great
@returns explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
  `;
  const formattedText = `
Here is my function.

@param thisIsAReallyLongVariableNameThatGoesToHalfTheScreen But I must explain to you how all this
                                 mistaken idea of denouncing pleasure and praising pain was born and
                                 I will give you a complete account of the system, and expound the
                                 actual teachings of the great
@returns explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
         avoids pleasure explorer of the truth, the master-builder of human happiness. No one
         rejects, dislikes, or avoids pleasure itself
  `;
  testFormatText(text, formattedText);
});

test("Title with hyphen separator", () => {
  const text = `
----------------
Getter functions
----------------
  `;
  testFormatText(text);
});

test("eslint-disable without trailing text", () => {
  const text = `
Trim the quotes surrounding the sentence.
eslint-disable-next-line no-constant-condition
  `;
  testFormatText(text);
});

test("eslint-disable with trailing text", () => {
  const text = `
Trim the quotes surrounding the sentence.
eslint-disable-next-line no-constant-condition
This is another line.
  `;
  testFormatText(text);
});

test("eslint-disable with long line", () => {
  const text = `
eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require,global-require,no-plusplus
  `;
  testFormatText(text);
});

test("Enum block label without trailing text", () => {
  const text = `
ModCallback.POST_PLAYER_RENDER (32)
PlayerVariant.PLAYER (0)
BabySubType.SUB_TYPE (1)
  `;
  testFormatText(text);
});

test("Enum block label with trailing text", () => {
  const text = `
ModCallback.POST_PLAYER_RENDER (32)
PlayerVariant.PLAYER (0)
This is a description.
  `;
  testFormatText(text);
});

test("Line with sole integer", () => {
  const text = `
1
This is the first value.
  `;
  testFormatText(text);
});

test("Line with sole float", () => {
  const text = `
1.0
This is the first value.
  `;
  testFormatText(text);
});

test("Line with sole bit flag", () => {
  const text = `
1 << 1
This is the first value.
  `;
  testFormatText(text);
});

test("Line with number list", () => {
  const text = `
14, 33
This is the first and second values.
  `;
  testFormatText(text);
});

test("TODO after a line", () => {
  const text = `
The boost is the amount of damage granted by Dim Candle.
TODO: DELETE
  `;
  testFormatText(text);
});

test("TODO before a line", () => {
  const text = `
TODO: DELETE
The boost is the amount of damage granted by Dim Candle.
  `;
  testFormatText(text);
});

test("Comment with a parenthetical sentence before a param JSDoc tag", () => {
  const text = `
Foo.

(This is a parenthetical sentence.)
@param foo A description of foo.
  `;
  const formattedText = `
Foo.

(This is a parenthetical sentence.)

@param foo A description of foo.
  `;
  testFormatText(text, formattedText);
});

test("Tab characters removed", () => {
  const text = `
Some text.

Some	tab		characters			here.

This is some other normal text.
  `;
  const formattedText = `
Some text.

Some tab characters here.

This is some other normal text.
  `;
  testFormatText(text, formattedText);
});
