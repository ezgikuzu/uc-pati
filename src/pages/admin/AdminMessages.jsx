import { useDispatch, useSelector } from "react-redux";
import { approveMessage, rejectMessage, deleteMessage } from "../../store/messagesSlice";

export default function AdminMessages() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);

  const handleApprove = (id) => {
    dispatch(approveMessage(id));
  };

  const handleReject = (id) => {
    dispatch(rejectMessage(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteMessage(id));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Beklemede":
        return "bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black";
      case "Onaylandı":
        return "bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black";
      case "Cevaplandı":
        return "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black";
      case "Reddedildi":
        return "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black";
      default:
        return "bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-black";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "Beklemede":
        return "Beklemede (Onay Bekliyor)";
      case "Onaylandı":
        return "Onaylandı (Hekim Bekliyor)";
      case "Cevaplandı":
        return "Cevaplandı";
      case "Reddedildi":
        return "Reddedildi";
      default:
        return status;
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f8f7] px-4 py-12">
      <section className="max-w-6xl mx-auto">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-8 shadow-sm mb-8">
          <span className="inline-flex bg-[#e8f5f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
            Admin Panel
          </span>

          <h1 className="text-4xl font-black text-[#134e4a] mt-5">
            Gelen İletişim Mesajları
          </h1>

          <p className="text-slate-500 mt-4">
            İletişim sayfasından gönderilen kullanıcı mesajlarını buradan inceleyebilir, onaylayıp hekime yönlendirebilir veya reddedebilirsiniz.
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
            <div className="text-5xl mb-4">📭</div>

            <h2 className="text-2xl font-black text-[#134e4a]">
              Henüz mesaj yok
            </h2>

            <p className="text-slate-500 mt-3">
              İletişim formundan mesaj gönderildiğinde burada görünecek.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {[...messages].reverse().map((message) => (
              <div
                key={message.id}
                className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm animate-fade-in"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-black text-[#134e4a]">
                        {message.subject}
                      </h2>

                      <span className={getStatusBadge(message.status)}>
                        {getStatusLabel(message.status)}
                      </span>
                    </div>

                    <p className="text-slate-500 mt-2">
                      Gönderen: {message.name}
                    </p>

                    <p className="text-slate-500">
                      E-posta: {message.email}
                    </p>

                    <p className="text-slate-500">
                      Telefon: {message.phone || "Belirtilmedi"}
                    </p>

                    <p className="text-slate-400 text-sm mt-2">
                      Tarih: {message.date}
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {message.status === "Beklemede" && (
                      <>
                        <button
                          onClick={() => handleApprove(message.id)}
                          className="bg-[#0f766e] text-white px-4 py-3 rounded-2xl font-black text-sm hover:bg-[#134e4a] transition"
                        >
                          Onayla (Hekime Gönder)
                        </button>

                        <button
                          onClick={() => handleReject(message.id)}
                          className="bg-orange-500 text-white px-4 py-3 rounded-2xl font-black text-sm hover:bg-orange-600 transition"
                        >
                          Reddet
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDelete(message.id)}
                      className="bg-red-500 text-white px-4 py-3 rounded-2xl font-black text-sm hover:bg-red-600 transition"
                    >
                      Sil
                    </button>
                  </div>
                </div>

                <div className="mt-5 bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                  <p className="text-[#134e4a] leading-7">
                    {message.message}
                  </p>
                </div>

                {message.responses && message.responses.length > 0 && (
                  <div className="mt-5 border-t border-slate-100 pt-5 space-y-4">
                    <h3 className="font-bold text-[#134e4a] text-sm">Hekim Yanıtları:</h3>
                    {message.responses.map((resp) => (
                      <div
                        key={resp.id}
                        className="bg-[#f0f9ff] border border-blue-100 rounded-2xl p-5 text-sm"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-black text-blue-700">{resp.doctorName}</span>
                          <span className="text-slate-400 text-xs">{resp.date}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{resp.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}