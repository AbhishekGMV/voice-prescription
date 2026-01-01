export {};

declare global {
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: any) => void;
    start(): void;
    stop(): void;
    abort(): void;
  }

  interface SpeechRecognitionEvent {
    resultIndex: number;
    results: {
      [key: number]: {
        [key: number]: {
          transcript: string;
        };
      };
    };
  }

  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}
