import { Request, Response } from "express";

let startingExecution: Date = new Date();

export function getStartingExecution(): Date {
  return startingExecution;
}

export function openServerMiddleware(req: Request, res: Response) {
  const adjustDisplay = (value: number, amount: number): string => {
    let display = value.toString();

    while (display.length < amount) {
      display = `0${display}`
    }

    return display;
  }

  const milliseconds: number = Math.abs(new Date().getTime() - getStartingExecution().getTime());
  const seconds: number = Math.trunc(milliseconds / 1000);
  const minuts: number = Math.trunc(seconds / 60);
  const hours: number = Math.trunc(minuts / 60);

  res.status(200).send({
    message: 'server is open',
    started: getStartingExecution(),
    runningTime: `${adjustDisplay(hours, 2)}:${adjustDisplay(minuts - (hours * 60), 2)}`
  });
};