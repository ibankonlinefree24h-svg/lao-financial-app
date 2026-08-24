import React, { useState } from 'react';
import { Bot, Sparkles, Send, ShieldCheck, AlertTriangle, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function AiAnalystView({ transactions }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'AI',
      text: 'ສະບາຍດີ! ຂ້ອຍແມ່ນ AI Financial Analyst ປະຈຳ IBank Manager. ຂ້ອຍໄດ້ວິເຄາະຂໍ້ມູນທຸລະກຳການເງິນທີ່ຜ່ານການກວດສອບແລ້ວ. ທ່ານສາມາດຖາມຄຳຖາມ ຫຼື ໃຫ້ຂ້ອຍສະຫຼຸບສະຖານະການເງິນໄດ້ເລີຍ!',
      timestamp: '10:00 AM'
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleQuestions = [
    '💡 ສະຫຼຸບສະຖານະການເງິນ ແລະ ກຳໄລເດືອນນີ້ໃຫ້ແດ່?',
    '📢 ໝວດໝູ່ໃດມີລາຍຈ່າຍຜິດປົກກະຕິ ຫຼື ເກີນງົບ?',
    '🔮 ຄາດຄະເນກະແສເງິນສົດ (Cashflow Forecast) 30 ວັນຂ້າງໜ້າ?',
    '✂️ ມີຄຳແນະນຳການຫຼຸດຕົ້ນທຶນ (Cost Reduction) ຢູ່ບ່ອນໃດແດ່?'
  ];

  const handleSend = (userText) => {
    const q = userText || query;
    if (!q) return;

    const newMsgs = [...messages, { sender: 'USER', text: q, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    setMessages(newMsgs);
    setQuery('');
    setIsAnalyzing(true);

    setTimeout(() => {
      let aiReply = '';
      if (q.includes('ສະຫຼຸບ') || q.includes('ກຳໄລ')) {
        aiReply = `📊 **ຂໍ້ສະຫຼຸບການເງິນປະຈຳເດືອນ (Financial Diagnosis):**\n- 🟢 **ລາຍຮັບລວມ:** ₭ 27,400,000 ກີບ (ເຕີບໂຕ +15.8% MoM)\n- 🔴 **ລາຍຈ່າຍລວມ:** ₭ 5,900,000 ກີບ (ຄວບຄຸມຢູ່ໃນງົບປະມານ 35%)\n- 💰 **ກຳໄລສຸດທິ:** ₭ 21,500,000 ກີບ (Profit Margin: 78.4%)\n\n📌 **ຄຳແນະນຳ:** ສະພາບຄ່ອງການເງິນຈັດຢູ່ໃນລະດັບດີຫຼາຍ (Excellent Health). ຄວນຈັດສັນເງິນກຳໄລ 45% ເພີ່ມຄັງປ່ອຍກູ້ LAK/RUB ເພື່ອຂະຫຍາຍຖານລູກຄ້າ.`;
      } else if (q.includes('ຜິດປົກກະຕິ') || q.includes('ເກີນງົບ')) {
        aiReply = `⚠️ **ກວດພົບລາຍຈ່າຍທີ່ຕ້ອງເຝົ້າລະວັງ:**\n- 📢 **ຄ່າ Ads ໂຄສະນາ:** ໃຊ້ໄປແລ້ວ 4,000,000 ກີບ (ກວມເອົາ 67% ຂອງລາຍຈ່າຍທັງໝົດ).\n- 💡 **ຂໍ້ສະເໜີແນະ:** ຄວນປັບ Optimization ໃສ່ກຸ່ມເປົ້າໝາຍທີ່ໃຫ້ Conversion Rate ສູງ ເພື່ອຫຼຸດ CAC ລະດັບ 15%.`;
      } else if (q.includes('ຄາດຄະເນ') || q.includes('Cashflow')) {
        aiReply = `🔮 **ຄາດຄະເນກະແສເງິນສົດ (Cashflow Forecast 30 ວັນ):**\n- 🟢 **Inflow ຄາດການ:** ₭ 32,500,000 ກີບ (ຈາກດອກເບ້ຍສິນເຊື່ອທີ່ຈະຄົບກຳນົດ).\n- 🔴 **Outflow ຄາດການ:** ₭ 6,500,000 ກີບ (ຄ່າເຊົ່າ, ເງິນເດືອນ, IT Server).\n- 💰 **Cash Balance ຄາດການ:** ₭ 136,200,000 ກີບ (ມີເງິນສົດສຳຮອງພຽງພໍ 100%).`;
      } else {
        aiReply = `💡 **ຄຳຕອບວິເຄາະຈາກ AI:**\n- ຂ້ອຍໄດ້ກວດສອບຖານຂໍ້ມູນທຸລະກຳ ແລະ ພົບວ່າ ອົງກອນຂອງທ່ານມີລະບົບການເງິນທີ່ເຂັ້ມແຂງ NPL ຕ່ຳພຽງ 0.7%.\n- ທ່ານສາມາດກວດສອບລາຍງານ P&L ແລະ Export ໄຟລ໌ Excel ໄດ້ຢູ່ໜ້າລາຍງານ.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'AI',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsAnalyzing(false);
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.1))', borderColor: 'rgba(168,85,247,0.3)' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Bot size={28} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>🤖 AI Financial Analyst & Decision Assistant (ພາສາລາວ)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ລະບົບ AI ວິເຄາະສະພາບການເງິນ, ກວດຫາຄວາມສ່ຽງ, ຄາດຄະເນ Cashflow, ແລະ ຕອບຄຳຖາມທຸລະກຳ
          </p>
        </div>
      </div>

      {/* Suggested Questions */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {sampleQuestions.map((sq, i) => (
          <button
            key={i}
            className="icon-btn-xs"
            style={{ width: 'auto', padding: '8px 14px', fontSize: '0.82rem', background: 'rgba(255,255,255,0.06)', borderRadius: '10px' }}
            onClick={() => handleSend(sq)}
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Chat Messages Window */}
      <div className="glass-panel" style={{ padding: '20px', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', maxHeight: '420px', paddingRight: '6px' }}>
          {messages.map((m, idx) => {
            const isAI = m.sender === 'AI';
            return (
              <div
                key={idx}
                style={{
                  alignSelf: isAI ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  padding: '14px 18px',
                  borderRadius: isAI ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                  background: isAI ? 'rgba(30, 41, 59, 0.85)' : 'linear-gradient(135deg, #a855f7, #6366f1)',
                  border: isAI ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: isAI ? '#c084fc' : '#e0e7ff', marginBottom: '4px', fontWeight: 700 }}>
                  {isAI ? '🤖 AI Financial Analyst' : '👤 You (Manager)'} • {m.timestamp}
                </div>
                <div style={{ whitespace: 'pre-line' }}>{m.text}</div>
              </div>
            );
          })}

          {isAnalyzing && (
            <div style={{ alignSelf: 'flex-start', color: '#c084fc', fontSize: '0.85rem', fontWeight: 600 }}>
              ⏳ AI ກຳລັງປະມວນຜົນອ່ານຖານຂໍ້ມູນທຸລະກຳ...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="ພິມຄຳຖາມກ່ຽວກັບການເງິນ ເຊັ່ນ: ຂໍຄຳແນະນຳຫຼຸດຕົ້ນທຶນເດືອນນີ້..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button className="btn-primary-emerald" style={{ padding: '12px 22px' }} onClick={() => handleSend()}>
            <Send size={18} /> ສົ່ງ
          </button>
        </div>
      </div>

      {/* AI Security Notice */}
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <ShieldCheck size={15} color="#34d399" />
        <span>ຄຳແນະນຳຈາກ AI ແມ່ນອີງຕາມຂໍ້ມູນທຸລະກຳທີ່ຜ່ານການກວດສອບ. ຜູ້ຈັດການຄວນກວດສອບກ່ອນການຕັດສິນໃຈ.</span>
      </div>
    </div>
  );
}
