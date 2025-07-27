import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { User, Mail, Phone, MapPin, Calendar, CreditCard as Edit, Save, Camera } from 'lucide-react-native';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

export default function PersonalInfoScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris',
    birthDate: '15/03/1985',
    profession: 'Développeuse Web',
    nationality: 'Française',
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Succès', 'Vos informations ont été mises à jour');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const infoSections = [
    {
      title: 'Informations de base',
      items: [
        { key: 'firstName', label: 'Prénom', icon: User, value: userInfo.firstName },
        { key: 'lastName', label: 'Nom', icon: User, value: userInfo.lastName },
        { key: 'birthDate', label: 'Date de naissance', icon: Calendar, value: userInfo.birthDate },
        { key: 'nationality', label: 'Nationalité', icon: MapPin, value: userInfo.nationality },
      ]
    },
    {
      title: 'Contact',
      items: [
        { key: 'email', label: 'Email', icon: Mail, value: userInfo.email },
        { key: 'phone', label: 'Téléphone', icon: Phone, value: userInfo.phone },
        { key: 'address', label: 'Adresse', icon: MapPin, value: userInfo.address },
      ]
    },
    {
      title: 'Professionnel',
      items: [
        { key: 'profession', label: 'Profession', icon: User, value: userInfo.profession },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MD</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoLabel}>Photo de profil</Text>
          <TouchableOpacity>
            <Text style={styles.changePhotoText}>Changer la photo</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Button */}
        <View style={styles.editButtonContainer}>
          {!isEditing ? (
            <Button
              title="Modifier mes informations"
              onPress={() => setIsEditing(true)}
              variant="primary"
              style={styles.editButton}
            />
          ) : (
            <View style={styles.editActions}>
              <Button
                title="Annuler"
                onPress={handleCancel}
                variant="secondary"
                style={styles.actionButton}
              />
              <Button
                title="Sauvegarder"
                onPress={handleSave}
                variant="primary"
                style={styles.actionButton}
              />
            </View>
          )}
        </View>

        {/* Information Sections */}
        {infoSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.infoSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.infoCard}>
              {section.items.map((item, itemIndex) => (
                <View key={item.key} style={styles.infoItem}>
                  <View style={styles.infoItemLeft}>
                    <View style={styles.infoIcon}>
                      <item.icon size={20} color="#6B7280" />
                    </View>
                    <Text style={styles.infoLabel}>{item.label}</Text>
                  </View>
                  {isEditing ? (
                    <TextInput
                      style={styles.editInput}
                      value={userInfo[item.key]}
                      onChangeText={(text) => setUserInfo(prev => ({ ...prev, [item.key]: text }))}
                      placeholder={item.label}
                    />
                  ) : (
                    <Text style={styles.infoValue}>{item.value}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Account Status */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Statut du compte</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.statusText}>Email vérifié</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.statusText}>Téléphone vérifié</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.statusText}>Identité vérifiée</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.statusText}>Adresse en attente de vérification</Text>
            </View>
          </View>
        </View>

        {/* Data Export */}
        <View style={styles.dataSection}>
          <Text style={styles.sectionTitle}>Mes données</Text>
          <View style={styles.dataCard}>
            <TouchableOpacity style={styles.dataItem}>
              <Text style={styles.dataLabel}>Exporter mes données</Text>
              <Text style={styles.dataDescription}>
                Télécharger toutes vos données personnelles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dataItem}>
              <Text style={[styles.dataLabel, { color: '#DC2626' }]}>Supprimer mon compte</Text>
              <Text style={styles.dataDescription}>
                Cette action est irréversible
              </Text>
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
  photoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  photoLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  editButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  editButton: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
    textAlign: 'right',
  },
  editInput: {
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
    textAlign: 'right',
  },
  statusSection: {
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
  },
  dataSection: {
    marginBottom: 24,
  },
  dataCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  dataDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});