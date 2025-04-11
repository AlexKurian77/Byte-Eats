import React, { useState } from 'react';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';
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
  TextStyle,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Message = {
  text: string;
  from: 'user' | 'bot';
};

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey;

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hey there! 👋 I\'m ByteBot, your personal nutrition assistant. How can I help you today?', from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMsg: Message = { text: input, from: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
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
        text: reply || 'I apologize, could you please rephrase your question?',
        from: 'bot',
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('API Error:', err);
      setMessages(prev => [
        ...prev,
        {
          text: 'Sorry, I encountered an error. Please try again in a moment.',
          from: 'bot',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.bubble, item.from === 'user' ? styles.userBubble : styles.botBubble]}>
      {item.from === 'bot' ? (
        <Markdown style={markdownStyles}>{item.text}</Markdown>
      ) : (
        <Text style={styles.bubbleText}>{item.text}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="robot" size={24} color="#4caf50" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>ByteBot</Text>
          <Text style={styles.headerSubtitle}>Your AI Nutrition Assistant</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.chat}
        />

        {loading && (
          <ActivityIndicator 
            size="small" 
            color="#4caf50" 
            style={styles.loadingIndicator} 
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ask ByteBot something..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity 
            onPress={sendMessage} 
            style={styles.sendBtn}
            disabled={input.trim() === '' || loading}
          >
            <MaterialCommunityIcons 
              name="send" 
              size={20} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,1)',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(76,175,80,0.3)',
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  chat: { 
    padding: 15,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 15,
  },
  userBubble: {
    backgroundColor: 'rgba(76,175,80,0.2)',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  botBubble: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  bubbleText: { 
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
  },
  loadingIndicator: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    color: '#fff',
    maxHeight: 100,
    minHeight: 40,
  },
  sendBtn: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
});

const markdownStyles: { [key: string]: TextStyle } = {
  body: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
  },
  strong: {
    fontWeight: 'bold',
    color: '#4caf50',
  },
  em: {
    fontStyle: 'italic',
    color: '#fff',
  },
  code_inline: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    fontFamily: 'Courier',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#4caf50',
  },
  code_block: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
    marginVertical: 8,
  },
  link: {
    color: '#4caf50',
    textDecorationLine: 'underline',
  },
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  paragraph: {
    marginVertical: 8,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
    marginVertical: 8,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    marginVertical: 8,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
    marginVertical: 8,
  },
};

export default ChatbotScreen;