declare module '../constants' {
  export const ServiceData: Array<{ 
    title: string; 
    content: string; 
    backgroundImage: { src: string }; 
    icon: React.ComponentType 
  }>;
}