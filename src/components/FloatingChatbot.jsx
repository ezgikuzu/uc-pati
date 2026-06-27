import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../store/chatbotSlice";

export default function FloatingChatbot() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatbot.messages);
  const { isLoggedIn, role, user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getGreetingAndSuggestions = () => {
    if (!isLoggedIn) {
      return {
        greeting:
          "Merhaba, ben Üç Pati Vet AI Asistanı. Üç Pati kliniğindeki randevu, sahiplendirme ve pet shop hizmetleri hakkında bilgi alabilirsiniz.",
        suggestions: [
          "Randevu nasıl alırım?",
          "Pet Shop ürünleri",
          "Hizmetleriniz neler?",
        ],
      };
    }

    if (role === "admin") {
      return {
        greeting:
          "Hoş geldiniz Admin Kullanıcısı. Mesaj onayları, ürün yönetimi ve kullanıcı yönetimi işlemlerinizde size nasıl yardımcı olabilirim?",
        suggestions: [
          "Gelen mesajları onaylama",
          "Ürün nasıl eklenir?",
          "Hekim talepleri",
        ],
      };
    }

    if (role === "doctor") {
      return {
        greeting: `Merhaba Dr. ${user?.name || "Ali Yılmaz"
          }. Laboratuvar sonuçları, hasta kayıtları veya çalışma saatlerinizi güncelleme konularında size yardımcı olabilirim.`,
        suggestions: [
          "Hastalarımı nasıl görürüm?",
          "Lab sonucu onaylatma",
          "Saatlerimi belirleme",
        ],
      };
    }

    return {
      greeting: `Merhaba ${user?.name || "Müşteri"
        }, ben Üç Pati Vet AI Asistanı. Randevularınız, laboratuvar sonuçlarınız, pet shop siparişleriniz veya evcil hayvan belirtileri hakkında yardımcı olabilirim.`,
      suggestions: [
        "Tahlil sonuçlarım",
        "Sağlık karnesi",
        "Sahiplendirme ilanı",
      ],
    };
  };

  const { greeting, suggestions } = getGreetingAndSuggestions();

  useEffect(() => {
    if (
      messages.length === 0 ||
      (messages.length === 1 &&
        messages[0].sender === "bot" &&
        messages[0].text.includes("ben Üç Pati"))
    ) {
      dispatch(setMessages([{ sender: "bot", text: greeting }]));
    }
  }, [isLoggedIn, role, user, greeting, dispatch, messages.length]);

  const handleSendMessage = async (e, textOverride) => {
    if (e) {
      e.preventDefault();
    }

    const userText = textOverride ? textOverride.trim() : message.trim();

    if (!userText) {
      return;
    }

    dispatch(addMessage({ sender: "user", text: userText }));

    if (!textOverride) {
      setMessage("");
    }

    setIsLoading(true);

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 90000);

    try {
      const response = await fetch("http://localhost:3002/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      dispatch(
        addMessage({
          sender: "bot",
          text:
            data.answer ||
            data.reply ||
            "Bu konuda şu anda net cevap oluşturamadım. Sorunuzu daha açık şekilde tekrar yazabilirsiniz.",
        })
      );
    } catch (error) {
      console.log("Chatbot bağlantı hatası:", error);

      let errorMessage =
        "Chatbot bağlantısında sorun oluştu. Backend server açık mı ve fetch adresi doğru mu kontrol et.";

      if (error.name === "AbortError") {
        errorMessage =
          "Chatbot yanıtı uzun sürdüğü için istek iptal edildi. Server çalışıyor olabilir ama yanıt geç geliyor.";
      }

      dispatch(
        addMessage({
          sender: "bot",
          text: errorMessage,
        })
      );
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#f97316] text-white shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition cursor-pointer"
        >
          🐾
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-32px)] h-[540px] bg-white rounded-[2rem] shadow-2xl border border-orange-100 flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-[#f97316] text-white px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-black text-lg">Vet AI Asistan</h3>
              <p className="text-xs text-orange-100">
                Üç Pati dijital destek
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#fff7ed] space-y-3">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${item.sender === "user"
                    ? "bg-[#f97316] text-white rounded-br-md animate-fade-in"
                    : "bg-white text-slate-700 border border-orange-100 rounded-bl-md animate-fade-in"
                    }`}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 border border-orange-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm shadow-sm">
                  Yanıt hazırlanıyor...
                </div>
              </div>
            )}
          </div>

          {suggestions && suggestions.length > 0 && (
            <div className="px-4 py-2 bg-[#fff7ed] flex gap-2 flex-wrap border-t border-orange-50/50">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSendMessage(null, suggestion)}
                  className="bg-white hover:bg-orange-50 border border-orange-200 text-orange-700 text-xs font-black px-3 py-1.5 rounded-full shadow-sm transition cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => handleSendMessage(e)}
            className="p-4 bg-white border-t border-orange-100 flex gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sorunuzu yazın..."
              className="flex-1 border border-orange-200 rounded-full px-4 py-3 text-sm outline-none focus:border-orange-400"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-12 h-12 rounded-full bg-[#f97316] text-white font-black hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}