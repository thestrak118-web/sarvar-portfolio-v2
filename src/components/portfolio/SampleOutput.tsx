import sample from "../../../public/samples/recontool-format.json";
import { DocumentIcon } from "@/components/ui/Icons";

export function SampleOutput() {
  return (
    <details className="v2-details v2-sample">
      <summary>JSON chiqish formati</summary>
      <p>
        recontool ma’lumot modelidagi maydonlardan qisqa namuna. example.com
        shartli domen; bu haqiqiy skan natijasi emas.
      </p>
      <pre>
        <code>{JSON.stringify(sample, null, 2)}</code>
      </pre>
      <a
        className="v2-text-link"
        href="/samples/recontool-format.json"
        download
      >
        <DocumentIcon />
        JSON namunani yuklab olish
      </a>
    </details>
  );
}
