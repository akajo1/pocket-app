import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Search, ChevronDown, ChevronRight, MessageCircle, Phone, Mail, Book, Video, FileText } from 'lucide-react-native';

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const helpCategories = [
    {
      icon: Book,
      title: 'Guide de démarrage',
      description: 'Apprenez les bases de MyWallet',
      color: '#4F46E5'
    },
    {
      icon: Video,
      title: 'Tutoriels vidéo',
      description: 'Regardez nos guides vidéo',
      color: '#059669'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Documentation technique complète',
      color: '#7C3AED'
    }
  ];

  const faqItems = [
    {
      question: 'Comment créer un portefeuille pour mon enfant ?',
      answer: 'Allez dans l\'onglet "Enfants", appuyez sur le bouton "+" en haut à droite, remplissez les informations de votre enfant et définissez un montant initial. Vous pourrez ensuite configurer des limites de dépenses et lier des appareils NFC.'
    },
    {
      question: 'Comment fonctionne le paiement NFC ?',
      answer: 'Le paiement NFC permet à vos enfants de payer sans contact. Liez un bracelet ou tag NFC au portefeuille de votre enfant, activez-le, et ils pourront payer en approchant l\'appareil d\'un terminal compatible.'
    },
    {
      question: 'Comment définir des limites de dépenses ?',
      answer: 'Dans le détail d\'un portefeuille enfant, appuyez sur "Limites". Vous pouvez définir des limites quotidiennes, hebdomadaires et par catégorie. Les dépenses seront automatiquement bloquées si les limites sont atteintes.'
    },
    {
      question: 'Que faire si j\'ai perdu mon téléphone ?',
      answer: 'Connectez-vous immédiatement sur notre site web et désactivez votre compte temporairement. Contactez notre support pour bloquer toutes les transactions. Vos données sont protégées par chiffrement.'
    },
    {
      question: 'Comment recharger un portefeuille enfant ?',
      answer: 'Ouvrez le détail du portefeuille enfant et appuyez sur "Charger". Choisissez le montant et confirmez. L\'argent sera transféré depuis votre portefeuille principal vers celui de votre enfant.'
    },
    {
      question: 'Les transactions sont-elles sécurisées ?',
      answer: 'Oui, toutes les transactions sont chiffrées et protégées par plusieurs couches de sécurité. Nous utilisons l\'authentification 2FA, la biométrie et surveillons les activités suspectes 24h/24.'
    },
    {
      question: 'Comment donner une récompense à mon enfant ?',
      answer: 'Dans le portefeuille de votre enfant, appuyez sur "Récompense", choisissez le montant, sélectionnez le type de récompense et ajoutez une raison. L\'argent sera ajouté instantanément.'
    },
    {
      question: 'Puis-je voir l\'historique des dépenses de mon enfant ?',
      answer: 'Oui, chaque portefeuille enfant affiche un historique détaillé des transactions avec graphiques et analyses. Vous pouvez voir les dépenses par catégorie et suivre les habitudes.'
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Chat en direct',
      description: 'Réponse immédiate',
      availability: 'Disponible 24h/24',
      color: '#059669'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      description: '+33 1 23 45 67 89',
      availability: 'Lun-Ven 9h-18h',
      color: '#4F46E5'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'support@mywallet.com',
      availability: 'Réponse sous 24h',
      color: '#7C3AED'
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher dans l'aide..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Help Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ressources d'aide</Text>
          <View style={styles.categoriesContainer}>
            {helpCategories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <category.icon size={24} color={category.color} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          <View style={styles.faqContainer}>
            {filteredFAQ.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity 
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(index)}>
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  {expandedFAQ === index ? (
                    <ChevronDown size={20} color="#6B7280" />
                  ) : (
                    <ChevronRight size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
                {expandedFAQ === index && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacter le support</Text>
          <View style={styles.contactContainer}>
            {contactOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.contactCard}>
                <View style={[styles.contactIcon, { backgroundColor: option.color + '20' }]}>
                  <option.icon size={24} color={option.color} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{option.title}</Text>
                  <Text style={styles.contactDescription}>{option.description}</Text>
                  <Text style={styles.contactAvailability}>{option.availability}</Text>
                </View>
                <ChevronRight size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsCard}>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionTitle}>Signaler un problème</Text>
              <Text style={styles.quickActionDescription}>
                Signalez un bug ou un problème technique
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionTitle}>Demander une fonctionnalité</Text>
              <Text style={styles.quickActionDescription}>
                Suggérez une amélioration de l'application
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionTitle}>Feedback général</Text>
              <Text style={styles.quickActionDescription}>
                Partagez votre expérience avec MyWallet
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoCard}>
          <Text style={styles.appInfoTitle}>MyWallet v1.0.0</Text>
          <Text style={styles.appInfoDescription}>
            Application de gestion financière familiale
          </Text>
          <View style={styles.appInfoLinks}>
            <TouchableOpacity style={styles.infoLink}>
              <Text style={styles.infoLinkText}>Conditions d'utilisation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoLink}>
              <Text style={styles.infoLinkText}>Politique de confidentialité</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  faqContainer: {
    marginHorizontal: 20,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    paddingTop: 12,
  },
  contactContainer: {
    paddingHorizontal: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: '#4F46E5',
    marginBottom: 2,
  },
  contactAvailability: {
    fontSize: 12,
    color: '#6B7280',
  },
  quickActionsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAction: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  appInfoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  appInfoDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  appInfoLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoLink: {
    paddingVertical: 8,
  },
  infoLinkText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
});