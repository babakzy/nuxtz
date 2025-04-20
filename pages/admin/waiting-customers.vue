<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Waiting Customers</h1>
    
    <div v-if="loading" class="flex justify-center py-10">
      <div class="animate-spin h-10 w-10 border-4 border-gray-300 rounded-full border-t-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <div v-else>
      <div class="flex justify-between mb-4">
        <div>
          <span class="text-gray-600">Total customers: {{ customers.length }}</span>
        </div>
        <div>
          <Button @click="refreshData" class="mr-2">Refresh</Button>
          <Button @click="downloadCSV" variant="outline">Export CSV</Button>
        </div>
      </div>

      <div class="bg-white shadow overflow-x-auto rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notified</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in customers" :key="customer.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ customer.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(customer.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="customer.notified" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Yes
                </span>
                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  No
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <Button 
                  size="sm" 
                  variant="outline"
                  :disabled="customer.notified"
                  @click="markAsNotified(customer.id)"
                >
                  Mark as Notified
                </Button>
              </td>
            </tr>
            <tr v-if="customers.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
                No customers in waiting list
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useToast } from '@/composables/useToast'

// Define type for the customer table
interface Customer {
  id: string
  email: string
  created_at: string
  updated_at: string
  notified: boolean
}

// Define Database types for Supabase operations
interface Database {
  public: {
    Tables: {
      waiting_customers: {
        Row: Customer
        Insert: Omit<Customer, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Customer, 'id' | 'created_at'>>
      }
    }
  }
}

const customers = ref<Customer[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const { toast } = useToast()
const supabase = useSupabaseClient<Database>()

async function fetchCustomers() {
  loading.value = true
  error.value = null
  
  try {
    const { data, error: supabaseError } = await supabase
      .from('waiting_customers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (supabaseError) throw supabaseError
    
    customers.value = data || []
  } catch (err: any) {
    error.value = err.message || 'Failed to load customers'
    console.error('Error fetching customers:', err)
  } finally {
    loading.value = false
  }
}

async function markAsNotified(id: string) {
  try {
    const { error: updateError } = await supabase
      .from('waiting_customers')
      .update({ notified: true, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (updateError) throw updateError
    
    // Update local state
    const index = customers.value.findIndex(c => c.id === id)
    if (index !== -1) {
      customers.value[index].notified = true
    }
    
    toast({
      title: 'Success',
      description: 'Customer marked as notified',
    })
  } catch (err: any) {
    toast({
      title: 'Error',
      description: err.message || 'Failed to update customer',
      variant: 'destructive',
    })
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString()
}

function downloadCSV() {
  // Create CSV content
  const headers = ['Email', 'Created At', 'Notified']
  const csvContent = [
    headers.join(','),
    ...customers.value.map(customer => [
      customer.email,
      customer.created_at,
      customer.notified ? 'Yes' : 'No'
    ].join(','))
  ].join('\n')
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `waiting-customers-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function refreshData() {
  fetchCustomers()
}

onMounted(() => {
  fetchCustomers()
})
</script> 