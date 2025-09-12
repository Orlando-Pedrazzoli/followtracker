// Type declarations for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
    getNumberOfPages(): number;
  }
}

declare module 'jspdf-autotable';
