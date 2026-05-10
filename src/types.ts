export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  budget: number;
  status: 'Novo' | 'Qualificando' | 'Qualificado' | 'Desqualificado' | 'Convertido';
  qualificationScore: number;
  aiObservation?: string;
  createdAt: string;
}

export interface Property {
  id: string;
  address: string;
  price: number;
  type: string;
  neighborhood: string;
  trend: 'up' | 'down' | 'stable';
  history: { date: string; price: number }[];
}

export interface OperationLog {
  id: string;
  type: 'CRM' | 'Financeiro' | 'Contrato' | 'Portal';
  action: string;
  status: 'Completo' | 'Pendente' | 'Erro';
  timestamp: string;
}
