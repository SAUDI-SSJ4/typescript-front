import type { SvgProps } from "../../types";

function Facebook({ className, size = "20" }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.46378 18.3643V10.1536H9.35847L9.79186 6.95376H6.4637V4.91079C6.4637 3.98436 6.73387 3.35304 8.12932 3.35304L9.90901 3.35225V0.49033C9.6012 0.451404 8.54468 0.364258 7.3157 0.364258C4.74968 0.364258 2.99294 1.85543 2.99294 4.59398V6.95376H0.0908203V10.1536H2.99294V18.3642H6.46378V18.3643Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Facebook;
