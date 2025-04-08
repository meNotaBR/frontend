export const calculaTempoPostagem = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) {
              console.error("Data inválida:", dateString);
              return "Data inválida";
            }
            
            const timestamp = date.getTime();
            const now = Date.now();
            const diffInMs = now - timestamp;
            
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
            
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            
            if (diffInDays > 15) {
              const day = date.getDate().toString().padStart(2, "0");
              const month = (date.getMonth() + 1).toString().padStart(2, "0");
              const year = date.getFullYear();
              
              return `${day}/${month}/${year}`;
            }
            
            if (diffInDays >= 1) {
              return diffInDays === 1 ? "1 Dia atrás" : `${diffInDays} Dias atrás`;
            }
            
            if (diffInHours >= 1) {
              return diffInHours === 1 ? "1 Hora atrás" : `${diffInHours} Horas atrás`;
            }
            
            if (diffInMinutes < 1) {
              return "Agora mesmo";
            }
            return diffInMinutes === 1 ? "1 Minuto atrás" : `${diffInMinutes} Minutos atrás`;
          } catch (error) {
            console.error("Erro ao processar a data:", error);
            return "Data inválida";
          }
    }