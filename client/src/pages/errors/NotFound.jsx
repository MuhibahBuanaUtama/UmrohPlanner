import ErrorLayout from "@/components/layouts/ErrorLayout";
import { ReactComponent as SearchEngine } from "@/assets/svg/search-engine.svg";
import Button from "@/components/ui/commons/Button";

const NotFound = () => {
  return (
    <>
      <ErrorLayout>
        <h1 className="mb-3 text-8xl font-bold text-green-800">404</h1>
        <h2>Halaman ini tidak ditemukan</h2>
        <SearchEngine className="mb-4 size-96 max-w-none" />
        <Button onClick={() => window.history.back()} children="Kembali" />
      </ErrorLayout>
    </>
  );
};

export default NotFound;
