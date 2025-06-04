"use client"

import React from 'react';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Props = {
    label: string;
    setDate: (date?: Date) => void;
    hasDate?: Date
};

const DatePicker = (props: Props) => {
    const [date, setDate] = React.useState<Date>();
    const [showCalendar, setShowCalendar] = React.useState(false);

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        props.setDate(selectedDate);
        setShowCalendar(false);
    };

    return (
        <div className="relative">
            <Button
                type='button'
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                )}
                onClick={() => setShowCalendar(!showCalendar)}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>Selecione a data</span>}
            </Button>
            
            {showCalendar && (
                <div className="absolute z-[200] mt-2 bg-background border rounded-md shadow-lg">
                    <Calendar
                        defaultMonth={props.hasDate}
                        locale={ptBR}
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        initialFocus
                        className="rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;
