import { ButtonCustom } from '@/components/custom/Button';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col p-8 m-auto border-[1px] border-[#4A5863] justify-center w-fit rounded-sm">
        <h1 className="text-xl font-bold text-[#CA2B17]">Page Not Found 404!</h1>
        <p className="text-lg text-[#4A5863]">The page you are looking for does not exist.</p>
        <div className="mt-[5%]">
          <ButtonCustom variant="secondary" color='red' type="link" destination="/">
            Go Back to Home
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
