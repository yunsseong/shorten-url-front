import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
  Link,
} from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit() {
    console.log("submit");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shortUrl);
    toast.success("URL이 클립보드에 복사되었습니다", {
      description: "이제 어디서든 이 링크를 공유할 수 있습니다",
      position: "top-center",
      duration: 3000,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            URL 단축 서비스
          </h1>
          <p className="text-muted-foreground md:text-xl">
            긴 URL을 짧고 기억하기 쉬운 링크로 변환하세요.
          </p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="https://example.com/very-long-url-that-needs-shortening"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={`pr-10 text-base h-12 ${
                      error
                        ? "border-destructive focus-visible:ring-destructive/30"
                        : ""
                    }`}
                  />
                  <Link className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                </div>
                {error && (
                  <div
                    className="flex items-center gap-2 p-3 text-sm rounded-md bg-destructive/10 text-destructive"
                    role="alert">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isLoading}>
                {isLoading ? "생성 중..." : "URL 단축하기"}
              </Button>
            </form>
            {showSuccess && (
              <div
                className="flex items-center gap-2 p-3 mt-4 text-sm rounded-md bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                role="alert">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>URL이 성공적으로 단축되었습니다!</span>
              </div>
            )}
            {shortUrl && (
              <div className="mt-6 space-y-4 p-4 rounded-lg bg-muted">
                <div className="flex justify-between items-center">
                  <p className="font-medium">단축된 URL</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="h-8 gap-1">
                    <Copy className="h-4 w-4" />
                    <span>복사</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 p-3 bg-background rounded-md border">
                  <span className="text-primary font-medium truncate flex-1">
                    {shortUrl}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    asChild>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster richColors closeButton />
    </div>
  );
}
