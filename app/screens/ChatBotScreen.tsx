import React, { useState } from 'react';
import Constants from 'expo-constants';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey;
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

type Message = {
  text: string;
  from: 'user' | 'bot';
};

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hey! What can I help you with today?', from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const GEMINI_KEY = GEMINI_API_KEY;

  const sendMessage = async () => {
    if (input.trim() === '') return;
  
    const userMsg: Message = { text: input, from: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
  
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );
  
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
      const botMsg: Message = {
        text: reply || 'Uhhh I spaced out... can you ask again?',
        from: 'bot',
      };
  
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Gemini glitchin:', err);
      setMessages(prev => [
        ...prev,
        {
          text: 'Bruh... something broke. Try again in a sec 🛠️',
          from: 'bot',
        } as Message,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.bubble, item.from === 'user' ? styles.userBubble : styles.botBubble]}>
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chat}
      />

      {loading && <ActivityIndicator size="small" color="#4caf50" style={{ marginBottom: 10 }} />}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask me something..."
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chat: { padding: 15 },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 15,
  },
  userBubble: {
    backgroundColor: '#c8e6c9',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  botBubble: {
    backgroundColor: '#eeeeee',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  bubbleText: { fontSize: 15 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default ChatbotScreen;
