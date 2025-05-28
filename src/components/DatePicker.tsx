"use client"

import React, { useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format, getYear, setYear as dateFnsSetYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"

type Props = {
    label: string;
    setDate: (date?: Date) => void;
};

const DatePicker = (props: Props) => {
    const [date, setDate] = React.useState<Date>();
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [year, setYear] = React.useState(getYear(new Date()));
    const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
    const calendarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Gerar array de anos (100 anos atrás até hoje)
    const years = Array.from({ length: 100 }, (_, i) => getYear(new Date()) - i);

    useEffect(() => {
        // Função para fechar o calendário quando clicar fora dele
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isSelectClick = target.parentElement?.getAttribute('role') === 'combobox' ||
                                target.parentElement?.getAttribute('role') === 'option' ||
                                target.parentElement?.classList.contains('select-content');

            if (!isSelectClick && 
                calendarRef.current && 
                !calendarRef.current.contains(target) && 
                buttonRef.current && 
                !buttonRef.current.contains(target)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(year);
            setDate(newDate);
            props.setDate(newDate);
            setCurrentMonth(newDate);
        } else {
            setDate(undefined);
            props.setDate(undefined);
        }
    };

    const handleYearChange = (selectedYear: string) => {
        const yearNum = parseInt(selectedYear);
        setYear(yearNum);
        
        // Atualiza o mês atual exibido no calendário
        const newCurrentMonth = dateFnsSetYear(currentMonth, yearNum);
        setCurrentMonth(newCurrentMonth);

        if (date) {
            const newDate = new Date(date);
            newDate.setFullYear(yearNum);
            setDate(newDate);
            props.setDate(newDate);
        }
    };

    const toggleCalendar = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowCalendar(!showCalendar);
    };

    return (
        <div className="relative">
            <Button
                ref={buttonRef}
                type="button"
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                )}
                onClick={toggleCalendar}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>Selecione a data</span>}
            </Button>
            
            {showCalendar && (
                <div ref={calendarRef} className="absolute z-[200] mt-2 bg-background border rounded-md shadow-lg">
                    <div className="flex items-center justify-between p-2 border-b">
                        <Select value={year.toString()} onValueChange={handleYearChange}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Ano" />
                            </SelectTrigger>
                            <SelectContent className="select-content">
                                {years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Calendar
                        locale={ptBR}
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        initialFocus
                        className="rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;
