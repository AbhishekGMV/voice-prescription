// "use client";

// import * as React from "react";
// import { Clock } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { TimePickerInput } from "./TimePickerInput";

// interface TimePickerProps {
//   date: Date | undefined;
//   setDate: (date: Date | undefined) => void;
// }

// export function TimePicker({ date, setDate }: TimePickerProps) {
//   const minuteRef = React.useRef<HTMLInputElement>(null);
//   const hourRef = React.useRef<HTMLInputElement>(null);

//   return (
//     <div className="flex items-end gap-2">
//       <div className="grid gap-1 text-center">
//         <Label htmlFor="hours" className="text-xs">
//           Hours
//         </Label>
//         <TimePickerInput
//           picker="hours"
//           date={date}
//           setDate={setDate}
//           ref={hourRef}
//           onRightFocus={() => minuteRef.current?.focus()}
//         />
//       </div>
//       <div className="grid gap-1 text-center">
//         <Label htmlFor="minutes" className="text-xs">
//           Minutes
//         </Label>
//         <TimePickerInput
//           picker="minutes"
//           date={date}
//           setDate={setDate}
//           ref={minuteRef}
//           onLeftFocus={() => hourRef.current?.focus()}
//         />
//       </div>
//       <div className="flex h-10 items-center">
//         <Clock className="ml-2 h-4 w-4" />
//       </div>
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./TimePickerInput";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

// Use forwardRef to allow refs to be passed to TimePicker
const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ date, setDate }, ref) => {
    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);

    return (
      <div className="flex items-end gap-2" ref={ref}>
        <div className="grid gap-1 text-center">
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
          <TimePickerInput
            picker="hours"
            date={date}
            setDate={setDate}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
          <TimePickerInput
            picker="minutes"
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
          />
        </div>
        <div className="flex h-10 items-center">
          <Clock className="ml-2 h-4 w-4" />
        </div>
      </div>
    );
  }
);

// Set a display name for debugging
TimePicker.displayName = "TimePicker";

export { TimePicker };
