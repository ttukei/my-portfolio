// SlidingText.tsx
const InfiniteHello = ({ slider, firstText, secondText }: { slider: any; firstText: any; secondText: any; }) => {
    return (
      <div className="absolute top-[calc(100vh-300px)] font-bespokeslab">
        <div ref={slider} className="relative whitespace-nowrap">
          <p ref={firstText} className="absolute relative m-0 text-white text-[230px] font-medium pr-[50px]">
            Hello 你好 Hola नमस्ते Oli otya
          </p>
          <p ref={secondText} className="absolute left-full top-0 m-0 text-white text-[230px] font-medium pr-[50px]">
            Hello 你好 Hola नमस्ते Oli otya
          </p>
        </div>
      </div>
    );
  };
  
  export default InfiniteHello;