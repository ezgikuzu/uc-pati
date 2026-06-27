import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  toggleUserStatus,
} from "../../store/userSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function UserManagement() {
  const dispatch = useDispatch();

  const { users, status, error } = useSelector((state) => state.users);

  const [selectedRole, setSelectedRole] = useState("Tümü");
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const roles = ["Tümü", "Müşteri", "Hekim", "Admin"];
  const statusOptions = ["Tümü", "Aktif", "Pasif"];

  const filteredUsers = users.filter((user) => {
    const roleMatch = selectedRole === "Tümü" || user.role === selectedRole;

    const statusMatch =
      selectedStatus === "Tümü" || user.status === selectedStatus;

    const searchMatch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase());

    return roleMatch && statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeUsers = users.filter((user) => user.status === "Aktif");
  const passiveUsers = users.filter((user) => user.status === "Pasif");
  const customerUsers = users.filter((user) => user.role === "Müşteri");
  const doctorUsers = users.filter((user) => user.role === "Hekim");

  const getRoleClass = (role) => {
    if (role === "Admin") {
      return "bg-purple-100 text-purple-700";
    }

    if (role === "Hekim") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-[#e7f4f2] text-[#0f766e]";
  };

  const getStatusClass = (statusText) => {
    if (statusText === "Aktif") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    return "bg-slate-100 text-slate-500";
  };

  const resetFilters = () => {
    setSearchText("");
    setSelectedRole("Tümü");
    setSelectedStatus("Tümü");
    setCurrentPage(1);
  };

  const exportCsv = () => {
    const headers = [
      "Ad Soyad",
      "E-posta",
      "Rol",
      "Durum",
      "Evcil Hayvan Sayısı",
      "Son Giriş",
    ];

    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.petCount,
      user.lastLogin,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "kullanici-listesi.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (status === "loading") {
    return (
      <PageContainer>
        <PageHeader
          label="Kullanıcı Yönetimi"
          title="Kullanıcılar yükleniyor"
          description="Kullanıcı verileri sistemden alınıyor."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">⏳</div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Veriler yükleniyor
          </h2>

          <p className="text-slate-500 mt-3">
            Lütfen birkaç saniye bekleyin.
          </p>
        </div>
      </PageContainer>
    );
  }

  if (status === "failed") {
    return (
      <PageContainer>
        <PageHeader
          label="Kullanıcı Yönetimi"
          title="Kullanıcı verileri alınamadı"
          description="Veriler yüklenirken bir sorun oluştu."
        />

        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">⚠️</div>

          <h2 className="text-3xl font-black text-red-600">
            Hata oluştu
          </h2>

          <p className="text-red-500 mt-3">{error}</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        label="Kullanıcı Yönetimi"
        title="Sistemdeki kullanıcıları yönetin"
        description="Admin bu sayfadan müşteri, hekim ve admin kullanıcılarını görüntüleyebilir, filtreleyebilir ve durumlarını değiştirebilir."
      />

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl mb-4">
            👥
          </div>

          <p className="text-slate-500 font-bold">Toplam Kullanıcı</p>

          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {users.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl mb-4">
            ✅
          </div>

          <p className="text-slate-500 font-bold">Aktif</p>

          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {activeUsers.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center text-2xl mb-4">
            ⏸️
          </div>

          <p className="text-slate-500 font-bold">Pasif</p>

          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {passiveUsers.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4">
            🩺
          </div>

          <p className="text-slate-500 font-bold">Hekim</p>

          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {doctorUsers.length}
          </h3>
        </div>
      </div>

      <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Kullanıcı Listesi
            </h2>

            <p className="text-slate-500 mt-2">
              Kullanıcıları ad, e-posta, rol veya durum bilgisine göre
              filtreleyebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportCsv}
              className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
            >
              CSV İndir
            </button>

            <Link
              to="/admin-panel"
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
            >
              Admin Paneline Dön
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_220px_220px] gap-4 mt-6">
          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Ad, e-posta veya rol ara"
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          />

          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          >
            {statusOptions.map((statusText) => (
              <option key={statusText}>{statusText}</option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="bg-[#f3f8f7] text-[#0f766e] px-6 py-3 rounded-full font-black mt-5 hover:bg-[#e7f4f2] transition"
        >
          Filtreleri Temizle
        </button>
      </div>

      <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-slate-500 text-sm">
                <th className="px-4 py-2">Kullanıcı</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Durum</th>
                <th className="px-4 py-2">Evcil Hayvan</th>
                <th className="px-4 py-2">Son Giriş</th>
                <th className="px-4 py-2">İşlem</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="bg-[#f3f8f7]">
                  <td className="px-4 py-4 rounded-l-2xl">
                    <h3 className="font-black text-[#134e4a]">
                      {user.name}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {user.email}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black ${getRoleClass(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black ${getStatusClass(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-slate-600 font-bold">
                    {user.petCount}
                  </td>

                  <td className="px-4 py-4 text-slate-500">
                    {user.lastLogin}
                  </td>

                  <td className="px-4 py-4 rounded-r-2xl">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => dispatch(toggleUserStatus(user.id))}
                        className="bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black hover:bg-[#d8e7e4] transition"
                      >
                        {user.status === "Aktif"
                          ? "Pasifleştir"
                          : "Aktifleştir"}
                      </button>

                      <button
                        onClick={() => dispatch(deleteUser(user.id))}
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-black hover:bg-red-200 transition"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>

              <h3 className="text-2xl font-black text-[#134e4a]">
                Kullanıcı bulunamadı
              </h3>

              <p className="text-slate-500 mt-2">
                Arama veya filtreyi değiştirerek tekrar deneyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>

      {filteredUsers.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentPage === index + 1
                  ? "w-11 h-11 rounded-full bg-[#0f766e] text-white font-black"
                  : "w-11 h-11 rounded-full bg-white border border-[#d8e7e4] text-[#134e4a] font-black"
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </PageContainer>
  );
}