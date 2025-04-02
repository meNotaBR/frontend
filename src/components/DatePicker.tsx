"use client"

import React from 'react';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Props = {
    label: string;
    setDate: (date?: Date) => void;
};

const DatePicker = (props: Props) => {

    const [date, setDate] = React.useState<Date>();

    const addDate = (datePicker: any) => {
        setDate(datePicker)
        props.setDate(datePicker)
    }

    return (
        <div>
            <Label className='mb-4'>{props.label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground "
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy") : <span>Selecione a data</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        locale={ptBR}
                        mode="single"
                        selected={date}
                        onSelect={addDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;
