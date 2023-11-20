import { LearnJest } from "./learnjest";

const learnjest = new LearnJest();

test("Add 2+2 is 4", ()=> {
    expect(learnjest.add(2,2)).toBe(4);
});

test("Multiply 3*2 is 6", ()=> {
    expect(learnjest.multiply(3,2)).toBe(6);
});

test("Subtract 5-2 is 3", ()=> {
    expect(learnjest.subtract(5,2)).toBe(3);
});

