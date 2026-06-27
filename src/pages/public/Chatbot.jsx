import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../../store/chatbotSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Chatbot() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatbot.messages);
  const { isLoggedIn, role, user } = useSelector((state) => state.auth);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getGreetingAndSuggestions = () => {
    if (!isLoggedIn) {
      return {
        greeting: "Merhaba, ben Üç Pati Vet AI asistanı. Randevu, laboratuvar sonucu, sağlık karnesi, hayvan pasaportu ve pet shop hakkında yardımcı olabilirim.",
        suggestions: ["Randevu nasıl alırım?", "Pet Shop ürünleri", "Hizmetleriniz neler?"],
      };
    }

    if (role === "admin") {
      return {
        greeting: `Hoş geldiniz Admin Kullanıcısı. Mesaj onayları, ürün yönetimi ve kullanıcı yönetimi işlemlerinizde size nasıl yardımcı olabilirim?`,
        suggestions: ["Gelen mesajları onaylama", "Ürün nasıl eklenir?", "Hekim talepleri"],
      };
    }

    if (role === "doctor") {
      return {
        greeting: `Merhaba Dr. ${user?.name || "Ali Yılmaz"}. Laboratuvar sonuçları, hasta kayıtları veya çalışma saatlerinizi güncelleme konularında size yardımcı olabilirim.`,
        suggestions: ["Hastalarımı nasıl görürüm?", "Lab sonucu onaylatma", "Saatlerimi belirleme"],
      };
    }

    // Default is customer
    return {
      greeting: `Merhaba ${user?.name || "Müşteri"}, ben Üç Pati Vet AI asistanı. Randevularınız, laboratuvar sonuçlarınız, pet shop siparişleriniz veya evcil hayvan belirtileri hakkında yardımcı olabilirim.`,
      suggestions: ["Tahlil sonuçlarım", "Sağlık karnesi", "Sahiplendirme ilanı"],
    };
  };

  const { greeting, suggestions } = getGreetingAndSuggestions();

  useEffect(() => {
    if (messages.length === 0 || (messages.length === 1 && messages[0].sender === "bot" && messages[0].text.includes("Randevu, laboratuvar sonucu"))) {
      dispatch(setMessages([{ sender: "bot", text: greeting }]));
    }
  }, [isLoggedIn, role, user, greeting, dispatch, messages.length]);

  const sendMessage = async (e, textOverride) => {
    if (e) {
      e.preventDefault();
    }

    const userText = textOverride ? textOverride.trim() : input.trim();

    if (!userText) {
      return;
    }

    dispatch(addMessage({ sender: "user", text: userText }));

    if (!textOverride) {
      setInput("");
    }
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3002/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
        }),
      });

      const data = await response.json();

      dispatch(
        addMessage({
          sender: "bot",
          text:
            data.answer ||
            "Bu konuda şu anda net cevap oluşturamadım. Sorunuzu daha açık şekilde tekrar yazabilirsiniz.",
        })
      );
    } catch (error) {
      dispatch(
        addMessage({
          sender: "bot",
          text: "Bağlantı kurulamadı. Chatbot server çalışıyor mu kontrol edin.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        label="Vet AI Asistan"
        title="Üç Pati Chatbot"
        description="Evcil hayvanınızla ilgili randevu, laboratuvar sonucu, sağlık karnesi ve hayvan pasaportu hakkında soru sorabilirsiniz."
      />

      <section className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm">
          <span className="inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🤖 Vet AI
          </span>

          <h2 className="text-4xl font-black mt-6 leading-tight">
            Evcil dostunuz için hızlı yardım alanı.
          </h2>

          <p className="text-white/80 leading-8 mt-5">
            Bu asistan; randevu alma, laboratuvar sonucu görüntüleme, sağlık
            karnesi, hayvan pasaportu, pet shop ve sahiplendirme konularında
            yardımcı olur.
          </p>

          <div className="grid gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">Örnek Soru</h3>
              <p className="text-white/75 mt-2">
                Laboratuvar sonucumu nereden görebilirim?
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">Örnek Soru</h3>
              <p className="text-white/75 mt-2">
                Evcil hayvanım için nasıl randevu alabilirim?
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">Örnek Soru</h3>
              <p className="text-white/75 mt-2">
                Hayvan pasaportunda hangi bilgiler var?
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] shadow-sm overflow-hidden">
          <div className="bg-[#f3f8f7] border-b border-[#d8e7e4] p-5">
            <h2 className="text-2xl font-black text-[#134e4a]">
              Chatbot Mesajları
            </h2>

            <p className="text-slate-500 mt-1">
              Sorunuzu yazın, asistan cevaplasın.
            </p>
          </div>

          <div className="h-[520px] overflow-y-auto p-5 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    message.sender === "user"
                      ? "max-w-[80%] bg-[#0f766e] text-white rounded-3xl rounded-br-md px-5 py-4"
                      : "max-w-[80%] bg-[#f3f8f7] text-[#134e4a] border border-[#d8e7e4] rounded-3xl rounded-bl-md px-5 py-4"
                  }
                >
                  <p className="leading-7">{message.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#f3f8f7] text-[#134e4a] border border-[#d8e7e4] rounded-3xl rounded-bl-md px-5 py-4">
                  Yanıt hazırlanıyor...
                </div>
              </div>
            )}
          </div>

          {suggestions && suggestions.length > 0 && (
            <div className="px-5 py-3 bg-[#f3f8f7] border-t border-[#d8e7e4] flex gap-2 flex-wrap">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => sendMessage(null, suggestion)}
                  className="bg-white hover:bg-[#e7f4f2] border border-[#d8e7e4] text-[#0f766e] text-xs font-black px-4 py-2 rounded-full shadow-sm transition cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => sendMessage(e)}
            className="border-t border-[#d8e7e4] p-5 flex flex-col sm:flex-row gap-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sorunuzu yazın..."
              className="flex-1 border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#0f766e] text-white px-7 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition disabled:bg-slate-300 cursor-pointer"
            >
              Gönder
            </button>
          </form>
        </div>
      </section>
    </PageContainer>
  );
}