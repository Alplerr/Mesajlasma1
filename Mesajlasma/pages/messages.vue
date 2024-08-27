<template>
  <div>
    <div class="header">Prototip-1</div>
    <div class="main-content">
      <!-- Kayıtlı Kişilerim -->
      <div class="sidebar contacts">
        <h3>Kayıtlı Kişilerim</h3>
        <div v-for="contact in contacts" :key="contact.id" class="contact" @click="selectContact(contact)">
          <img :src="contact.image" alt="Contact" width="50" height="50"/>
          <span>{{ contact.name }}</span>
        </div>
      </div>

      <!-- Gruplar -->
      <div class="sidebar groups">
        <h3>Gruplar</h3>
        <div v-for="group in groups" :key="group.id" class="group" @click="selectGroup(group)">
          <span>{{ group.name }}</span>
        </div>
      </div>

      <!-- Mesajlaşma -->
      <div class="chat-section">
        <div v-if="selectedContact || selectedGroup" class="chat-header">
          <h3>{{ selectedContact ? selectedContact.name : selectedGroup.name }}</h3>
          <div v-if="selectedGroup" class="controls">
            <button @click="showAddRemove(true)">Kişi Ekle</button>
            <button @click="showAddRemove(false)">Kişi Çıkar</button>
          </div>
          <p v-if="selectedGroup">Üyeler: {{ selectedGroup.members.join(', ') }}</p>
        </div>
        <div class="chat-box">
          <div v-for="message in messages" :key="message.id" class="message">
            <strong>{{ message.sender }}</strong>: {{ message.text }}
            <div class="timestamp">{{ message.timestamp }}</div>
          </div>
        </div>
        <textarea v-model="newMessage" @keyup.enter="sendMessage" placeholder="Mesajınızı yazın..."></textarea>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- üye yönetimi -->
    <div v-if="showAddRemoveModal" class="modal">
      <div class="modal-content">
        <h4>{{ addRemove ? 'Kişi Ekle' : 'Kişi Çıkar' }}</h4>
        <input v-model="newPersonName" placeholder="Yeni Kişi Adı" />
        <button @click="handleAddRemove">{{ addRemove ? 'Ekle' : 'Çıkar' }}</button>
        <button @click="showAddRemoveModal = false">Kapat</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [],
      groups: [],
      selectedContact: null,
      selectedGroup: null,
      messages: [],
      newMessage: '',
      showAddRemoveModal: false,
      addRemove: true,
      newPersonName: '',
      errorMessage: '',
      error: null
    };
  },
  async mounted() {
    await this.fetchContacts();
    await this.fetchGroups();
  },
  methods: {
    async fetchContacts() {
      // Kişileri almak için API çağrısı yapın
      try {
        const response = await fetch('/api/contacts');
        this.contacts = await response.json();
      } catch (error) {
        console.error('Kişiler alınırken bir hata oluştu:', error);
      }
    },
    async fetchGroups() {
      // Grupları almak için API çağrısı yapma
      try {
        const response = await fetch('/api/groups');
        this.groups = await response.json();
      } catch (error) {
        console.error('Gruplar alınırken bir hata oluştu:', error);
      }
    },
    async selectContact(contact) {
      this.selectedContact = contact;
      this.selectedGroup = null;
      await this.fetchMessages(); // Burada gerçek mesajları yüklemek
    },
    async selectGroup(group) {
      this.selectedGroup = group;
      this.selectedContact = null;
      await this.fetchMessages(); // Burada grup mesajlarını yüklemek
    },
    async fetchMessages() {
      if (!this.selectedGroup) return;

      // Mesajları almak için API çağrısı yapma.
      try {
        const response = await fetch(`/api/messages?groupId=${this.selectedGroup.id}`);
        this.messages = await response.json();
      } catch (error) {
        console.error('Mesajlar alınırken bir hata oluştu:', error);
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() === '') return;

      const sender = this.selectedContact ? this.selectedContact.name : 'admin'; // eğer özel mesaj ise
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId: this.selectedGroup.id,
            sender,
            text: this.newMessage
          })
        });

        this.messages.push({
          id: Date.now(),
          sender,
          text: this.newMessage,
          timestamp: new Date().toLocaleTimeString()
        });

        this.newMessage = '';
      } catch (error) {
        console.error('Mesaj gönderilirken bir hata oluştu:', error);
      }
    },
    showAddRemove(isAdding) {
      this.addRemove = isAdding;
      this.showAddRemoveModal = true;
    },
    handleAddRemove() {

    }
  }
};
</script>

<style scoped>

</style>


